import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation } from "../../content/navigation";
import { assetUrl } from "../../lib/assets";
import { ArrowRightIcon } from "../ui/Icons";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="site-header__brand" to="/" aria-label="Damon J. Young Jr. home">
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

      <Link className="site-header__book" to="/book-damon">
        <span>Book Damon</span>
        <ArrowRightIcon />
      </Link>

      <button
        className="site-header__menu-trigger"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile"
        >
          <p className="camera-meta">DTV / NAVIGATION</p>
          {navigation.map((item) => (
            <div className="mobile-navigation__group" key={item.label}>
              <NavLink to={item.to}>{item.label}</NavLink>
              {item.children ? (
                <div className="mobile-navigation__children">
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to}>
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <NavLink className="mobile-navigation__book" to="/book-damon">
            Book Damon
          </NavLink>
        </nav>
      ) : null}
    </header>
  );
}
