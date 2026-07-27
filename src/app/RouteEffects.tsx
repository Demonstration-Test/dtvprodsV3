import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  productionOrigin,
  routeByPath,
} from "../content/routes";

function ensureMeta(name: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.append(element);
  }
  return element;
}

function ensureCanonical() {
  let element = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.append(element);
  }
  return element;
}

export function RouteEffects() {
  const location = useLocation();
  const normalizedPath =
    location.pathname === "/"
      ? "/"
      : location.pathname.replace(/\/+$/, "");
  const route = routeByPath.get(normalizedPath) ?? routeByPath.get("/");

  useEffect(() => {
    if (!route) return;

    document.title = route.title;
    ensureMeta("description").content = route.description;
    ensureCanonical().href = `${productionOrigin}${route.canonicalPath}`;
    const targetId = location.hash.slice(1);
    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [location.pathname, location.hash, route]);

  return (
    <div
      className="sr-only"
      role="status"
      aria-label="Current page"
      aria-live="polite"
      aria-atomic="true"
    >
      {route?.h1}
    </div>
  );
}
