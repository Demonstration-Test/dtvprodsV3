import { AppShell } from "./app/AppShell";
import { SiteRoutes } from "./app/router";
import { MotionSystem } from "./lib/motion/MotionSystem";

export function App() {
  return (
    <MotionSystem>
      <AppShell>
        <SiteRoutes />
      </AppShell>
    </MotionSystem>
  );
}
