import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { routes } from "../../content/routes";

async function loadRouterModule() {
  const moduleUrl = pathToFileURL(resolve("src/app/router.tsx")).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    routerBasename: "",
    routeDefinitions: [],
  }));
}

describe("application router contract", () => {
  it("uses the GitHub Pages repository basename", async () => {
    const routerModule = await loadRouterModule();
    expect(routerModule.routerBasename).toBe("/dtvprodsV3");
  });

  it("registers every approved route", async () => {
    const routerModule = await loadRouterModule();
    expect(
      routerModule.routeDefinitions.map(
        (route: { path: string }) => route.path,
      ),
    ).toEqual(routes.map((route) => route.path));
  });
});
