import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  mobileNavigation,
  navigation,
} from "../../content/navigation";
import { assetUrl } from "../../lib/assets";
import { useTheme } from "../../lib/theme/ThemeProvider";
import {
  ArrowRightIcon,
  MoonIcon,
  SunIcon,
} from "../ui/Icons";

type InertElement = HTMLElement & { inert: boolean };

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const siteHeaderRef = useRef<HTMLElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const previousBodyStyles = {
      left: body.style.left,
      overflow: body.style.overflow,
      position: body.style.position,
      right: body.style.right,
      top: body.style.top,
      width: body.style.width,
    };
    const scrollY = window.scrollY;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#main-content, .site-footer, .sticky-book",
      ),
    ).map((element) => {
      const inertElement = element as InertElement;
      const previousInert = inertElement.inert ?? false;
      inertElement.inert = true;
      return { element: inertElement, previousInert };
    });

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.right = "0";
    document.body.style.left = "0";
    document.body.style.width = "100%";

    mobileNavigationRef.current
      ?.querySelector<HTMLAnchorElement>("a[href]")
      ?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        menuTriggerRef.current?.focus();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const links = Array.from(
        mobileNavigationRef.current?.querySelectorAll<HTMLAnchorElement>(
          "a[href]",
        ) ?? [],
      );
      const headerControls = Array.from(
        siteHeaderRef.current?.querySelectorAll<HTMLElement>(
          [
            ".site-header__brand",
            ".site-header__book",
            ".site-header__theme-toggle",
            ".site-header__menu-trigger",
          ].join(","),
        ) ?? [],
      );
      const focusableElements = [...headerControls, ...links];
      if (focusableElements.length === 0) return;

      const activeIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement,
      );
      if (activeIndex === -1) return;

      event.preventDefault();
      const offset = event.shiftKey ? -1 : 1;
      const nextIndex =
        (activeIndex + offset + focusableElements.length) %
        focusableElements.length;
      focusableElements[nextIndex]?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.left = previousBodyStyles.left;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.right = previousBodyStyles.right;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      for (const { element, previousInert } of backgroundElements) {
        element.inert = previousInert;
      }
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [menuOpen]);

  return (
    <>
      <header ref={siteHeaderRef} className="site-header">
        <div className="site-header__inner">
          <Link
            className="site-header__brand"
            to="/"
            aria-label="Damon J. Young Jr. home"
          >
            <img
              src={assetUrl("media/logos/dtv-camera-mark-128.webp")}
              alt=""
              width="48"
              height="48"
            />
            <span>
              <strong>Damon J. Young Jr.</strong>
              <small>Destined to Venture</small>
            </span>
          </Link>

          <nav className="site-header__desktop-nav" aria-label="Primary">
            {navigation.map((item) =>
              item.children ? (
                <details className="nav-audiences" key={item.label}>
                  <summary>{item.label}</summary>
                  <div className="nav-audiences__menu">
                    {item.children.map((child) => (
                      <NavLink key={child.to} to={child.to}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </details>
              ) : (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="site-header__actions">
            <Link className="site-header__book" to="/book-damon">
              <span>Book Damon</span>
              <ArrowRightIcon />
            </Link>

            <button
              className="site-header__theme-toggle"
              type="button"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-pressed={theme === "light"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              ref={menuTriggerRef}
              className="site-header__menu-trigger"
              type="button"
              aria-label={
                menuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {menuOpen ? (
        <nav
          ref={mobileNavigationRef}
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile"
        >
          <div className="mobile-navigation__inner">
            <p className="camera-meta">DTV / NAVIGATION</p>
            <div className="mobile-navigation__groups">
              {mobileNavigation.map((group) => (
                <div
                  className="mobile-navigation__group"
                  key={group.label}
                >
                  <p className="mobile-navigation__group-label">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={
                        item.to === "/book-damon"
                          ? "mobile-navigation__book"
                          : undefined
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}
