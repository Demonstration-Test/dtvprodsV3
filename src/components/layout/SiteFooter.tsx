import { Link } from "react-router-dom";
import { contact, externalLinks } from "../../content/externalLinks";
import { assetUrl } from "../../lib/assets";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <img
          src={assetUrl("media/logos/dtv-studio-white-360.webp")}
          alt="DTV Studio"
          width="180"
          height="88"
          loading="lazy"
        />
        <p>
          Damon J. Young Jr.
          <br />
          Motivational speaker, entrepreneur, and visual storyteller.
        </p>
      </div>
      <div>
        <p className="section-label">Explore</p>
        <Link to="/about">About</Link>
        <Link to="/speaking">Speaking</Link>
        <Link to="/workshops">Workshops</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div>
        <p className="section-label">Contact</p>
        <a href={externalLinks.email}>{contact.email}</a>
        <a href={externalLinks.phone}>{contact.phoneDisplay}</a>
        <span>{contact.location}</span>
      </div>
      <div className="site-footer__meta">
        <p>
          © {new Date().getFullYear()} DTV Productions. Public demo.
        </p>
        <Link to="/privacy">Privacy & inquiry disclosure</Link>
        <a
          href={externalLinks.dtvProductions}
          target="_blank"
          rel="noreferrer"
        >
          DTV Productions
        </a>
      </div>
    </footer>
  );
}
