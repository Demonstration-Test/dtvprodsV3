import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

async function loadProfileModule() {
  const moduleUrl = pathToFileURL(
    resolve("src/lib/motion/performanceProfile.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    selectMotionProfile: () => ({
      mode: "missing",
      allowLenis: true,
      allowWebgl: true,
      allowCursor: true,
      allowPinned: true,
      allowAutoplay: true,
    }),
  }));
}

const capableDevice = {
  prefersReducedMotion: false,
  saveData: false,
  viewportWidth: 1440,
  deviceMemory: 8,
  hardwareConcurrency: 8,
  webglSupported: true,
};

describe("motion performance profile", () => {
  it("allows the enhanced experience only on a capable desktop", async () => {
    const { selectMotionProfile } = await loadProfileModule();
    expect(selectMotionProfile(capableDevice)).toMatchObject({
      mode: "enhanced",
      allowLenis: true,
      allowWebgl: true,
      allowCursor: true,
      allowPinned: true,
      allowAutoplay: true,
    });
  });

  it.each([
    ["reduced motion", { prefersReducedMotion: true }],
    ["save data", { saveData: true }],
    ["mobile viewport", { viewportWidth: 767 }],
    ["limited memory", { deviceMemory: 4 }],
    ["limited CPU", { hardwareConcurrency: 4 }],
    ["WebGL failure", { webglSupported: false }],
  ])("selects a complete static fallback for %s", async (_, override) => {
    const { selectMotionProfile } = await loadProfileModule();
    expect(
      selectMotionProfile({ ...capableDevice, ...override }),
    ).toMatchObject({
      mode: "static",
      allowLenis: false,
      allowWebgl: false,
      allowCursor: false,
      allowPinned: false,
      allowAutoplay: false,
    });
  });
});
