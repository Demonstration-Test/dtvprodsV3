import { AppShell } from "./app/AppShell";
import { SiteRoutes } from "./app/router";
import { MotionSystem } from "./lib/motion/MotionSystem";
import { ThemeProvider } from "./lib/theme/ThemeProvider";

export function App() {
  return (
    <ThemeProvider>
      <MotionSystem>
        <AppShell>
          <SiteRoutes />
        </AppShell>
      </MotionSystem>
    </ThemeProvider>
  );
}
