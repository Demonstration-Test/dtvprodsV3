import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { RouteEffects } from "./RouteEffects";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <RouteEffects />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <Link className="sticky-book" to="/book-damon">
        Book Damon
      </Link>
    </>
  );
}
