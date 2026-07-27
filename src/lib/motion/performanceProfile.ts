export type MotionCapabilities = {
  prefersReducedMotion: boolean;
  saveData: boolean;
  viewportWidth: number;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  webglSupported: boolean;
};

export type MotionProfile = {
  mode: "enhanced" | "static";
  reason:
    | "capable"
    | "reduced-motion"
    | "save-data"
    | "viewport"
    | "memory"
    | "cpu"
    | "webgl";
  allowLenis: boolean;
  allowWebgl: boolean;
  allowCursor: boolean;
  allowPinned: boolean;
  allowAutoplay: boolean;
};

function staticProfile(reason: MotionProfile["reason"]): MotionProfile {
  return {
    mode: "static",
    reason,
    allowLenis: false,
    allowWebgl: false,
    allowCursor: false,
    allowPinned: false,
    allowAutoplay: false,
  };
}

export function selectMotionProfile(
  capabilities: MotionCapabilities,
): MotionProfile {
  if (capabilities.prefersReducedMotion) {
    return staticProfile("reduced-motion");
  }
  if (capabilities.saveData) {
    return staticProfile("save-data");
  }
  if (capabilities.viewportWidth < 768) {
    return staticProfile("viewport");
  }
  if (
    capabilities.deviceMemory !== undefined &&
    capabilities.deviceMemory <= 4
  ) {
    return staticProfile("memory");
  }
  if (
    capabilities.hardwareConcurrency !== undefined &&
    capabilities.hardwareConcurrency <= 4
  ) {
    return staticProfile("cpu");
  }
  if (!capabilities.webglSupported) {
    return staticProfile("webgl");
  }

  return {
    mode: "enhanced",
    reason: "capable",
    allowLenis: true,
    allowWebgl: true,
    allowCursor: true,
    allowPinned: true,
    allowAutoplay: true,
  };
}
