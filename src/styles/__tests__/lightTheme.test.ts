import { readFileSync } from "node:fs";

const tokens = readFileSync("src/styles/tokens.css", "utf8");
const base = readFileSync("src/styles/base.css", "utf8");
const sections = readFileSync("src/styles/sections.css", "utf8");
const styles = `${tokens}\n${base}\n${sections}`;

describe("complete light theme visual contract", () => {
  it("defines semantic surfaces, text, borders, controls, and media roles", () => {
    for (const token of [
      "--surface-page",
      "--surface-section",
      "--surface-raised",
      "--surface-inverse",
      "--text-primary",
      "--text-secondary",
      "--text-inverse",
      "--border-subtle",
      "--control-surface",
      "--control-border",
      "--media-surface",
      "--header-surface",
    ]) {
      expect(tokens).toContain(`${token}:`);
    }
  });

  it("keeps exact dark defaults and defines the approved pale light palette", () => {
    expect(tokens).toMatch(/:root\s*{[\s\S]*--surface-page:\s*#080808/);
    expect(tokens).toMatch(
      /:root\[data-theme="light"\]\s*{[\s\S]*color-scheme:\s*light/,
    );
    expect(tokens).toMatch(
      /:root\[data-theme="light"\]\s*{[\s\S]*--surface-page:\s*#f4f0e8/,
    );
    expect(tokens).toMatch(
      /:root\[data-theme="light"\]\s*{[\s\S]*--text-primary:\s*#171717/,
    );
  });

  it("uses semantic roles for document, section, field, and media surfaces", () => {
    expect(base).toContain("background: var(--surface-page)");
    expect(base).toContain("color: var(--text-primary)");
    expect(base).toContain("background: var(--surface-section)");
    expect(base).toContain("background: var(--media-surface)");
    expect(styles).toContain("background: var(--control-surface)");
    expect(styles).toContain("border-color: var(--control-border)");
  });

  it.each([
    ".site-header",
    ".nav-audiences__menu",
    ".mobile-navigation",
    ".hero",
    ".section--dark",
    ".section--light",
    ".form-field input",
    ".form-field select",
    ".form-field textarea",
    ".site-footer",
    ".sticky-book",
    ".home-chapter-nav ol",
  ])("provides a light-theme treatment for %s", (selector) => {
    expect(styles).toContain(
      `:root[data-theme="light"] ${selector}`,
    );
  });

  it("keeps full photography naturally colored and contained", () => {
    expect(base).toMatch(
      /\.frame img\s*{[\s\S]*object-fit:\s*contain/,
    );
    expect(styles).not.toMatch(
      /:root\[data-theme="light"\][^{]*(?:picture|\\.frame img|\\.responsive-image)[^{]*{[^}]*(?:filter:\s*(?:invert|hue-rotate|brightness)|opacity:\s*0(?:\D|$))/,
    );
  });
});
