import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const tokens = readFileSync(resolve("src/styles/tokens.css"), "utf8");
const base = readFileSync(resolve("src/styles/base.css"), "utf8");
const sections = readFileSync(resolve("src/styles/sections.css"), "utf8");
const css = `${tokens}\n${base}\n${sections}`;

describe("balanced responsive scale", () => {
  it("uses the approved layout tokens", () => {
    expect(tokens).toMatch(/--header-height:\s*5rem/);
    expect(tokens).toMatch(/--mobile-header-height:\s*4\.5rem/);
    expect(tokens).toMatch(
      /--mobile-booking-height:\s*calc\(4rem \+ env\(safe-area-inset-bottom,\s*0px\)\)/,
    );
    expect(tokens).toMatch(/--content-max:\s*72rem/);
    expect(tokens).toMatch(
      /--page-gutter:\s*clamp\(1\.25rem,\s*6vw,\s*6rem\)/,
    );
    expect(tokens).toMatch(
      /--section-space:\s*clamp\(3\.5rem,\s*6\.5vw,\s*6\.5rem\)/,
    );
  });

  it("locks the approved desktop display ranges", () => {
    expect(tokens).toMatch(
      /--display-hero:\s*clamp\(4\.75rem,\s*9vw,\s*7\.75rem\)/,
    );
    expect(tokens).toMatch(
      /--display-page:\s*clamp\(3\.5rem,\s*7vw,\s*6\.75rem\)/,
    );
    expect(tokens).toMatch(
      /--display-section:\s*clamp\(2\.75rem,\s*5vw,\s*4\.75rem\)/,
    );
    expect(tokens).toMatch(
      /--display-statement:\s*clamp\(3rem,\s*6vw,\s*5\.75rem\)/,
    );
  });

  it("contains homepage chapters only at approved default-height thresholds", () => {
    expect(css).toMatch(
      /@media\s*\(min-width:\s*768px\)\s*and\s*\(min-height:\s*620px\)[\s\S]*?\.home-chapter:not\(\.hero\)[\s\S]*?min-height:\s*calc\(100svh - var\(--header-height\)\)/,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*767px\)\s*and\s*\(min-height:\s*560px\)[\s\S]*?\.home-chapter:not\(\.hero\)[\s\S]*?min-height:\s*calc\(100svh - var\(--mobile-header-height\) - var\(--mobile-booking-height\)\)/,
    );
  });

  it("bounds supporting page heroes and media", () => {
    expect(sections).toMatch(
      /\.page-hero[\s\S]*?min-height:\s*clamp\(28rem,\s*68svh,\s*42rem\)/,
    );
    expect(sections).toMatch(
      /\.page-hero__media[\s\S]*?max-height:\s*34rem/,
    );
  });

  it("centers root compositions inside the approved editorial frame", () => {
    expect(tokens).toMatch(
      /--frame-gutter:\s*max\(var\(--page-gutter\),\s*calc\(\(100vw - var\(--content-max\)\) \/ 2\)\)/,
    );
    expect(base).toMatch(
      /\.section\s*\{[\s\S]*?padding-inline:\s*var\(--frame-gutter\)/,
    );
    expect(sections).toMatch(
      /\.site-header__inner[\s\S]*?padding-inline:\s*var\(--frame-gutter\)/,
    );
    expect(sections).toMatch(
      /\.site-footer[\s\S]*?padding-inline:\s*var\(--frame-gutter\)/,
    );
    expect(sections).toMatch(
      /\.hero__content[\s\S]*?max-width:\s*var\(--content-max\)/,
    );
  });

  it("shows primary framed photographs in full", () => {
    expect(base).toMatch(
      /\.frame\s*\{[\s\S]*?background:\s*var\(--media-matte\)/,
    );
    expect(base).toMatch(
      /\.frame img\s*\{[\s\S]*?object-fit:\s*contain[\s\S]*?object-position:\s*center/,
    );
    expect(sections).not.toMatch(
      /\.(?:home-story__image|audiences__focus-image|portfolio__feature-image|portfolio__preview-image|dtv-story__image)[^{]*\{[^}]*object-fit:\s*cover/,
    );
    expect(sections).not.toMatch(
      /\.page-hero__media img\s*\{[^}]*object-fit:\s*cover/,
    );
  });

  it("keeps body copy within the approved readable range", () => {
    expect(base).toMatch(
      /font-size:\s*clamp\(0\.95rem,[^;]*1\.08rem\)/,
    );
    expect(base).toMatch(
      /\.body-large[\s\S]*?font-size:\s*clamp\(1rem,[^;]*1\.2rem\)/,
    );
  });
});
