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
    expect(tokens).toMatch(/--content-max:\s*84rem/);
    expect(tokens).toMatch(
      /--page-gutter:\s*clamp\(1\.1rem,\s*4vw,\s*4rem\)/,
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

  it("keeps body copy within the approved readable range", () => {
    expect(base).toMatch(
      /font-size:\s*clamp\(0\.95rem,[^;]*1\.08rem\)/,
    );
    expect(base).toMatch(
      /\.body-large[\s\S]*?font-size:\s*clamp\(1rem,[^;]*1\.2rem\)/,
    );
  });
});
