import {
  speakingThemeDisclaimer,
  speakingThemes,
} from "../../content/speakingThemes";
import { ActionLink } from "../ui/ActionLink";

export function SpeakingThemeRail() {
  return (
    <section className="themes section section--light">
      <p className="section-label">Speaking themes</p>
      <h2 className="display display--section">
        Ideas built to move with the room.
      </h2>
      <ol className="themes__list">
        {speakingThemes.map((theme) => (
          <li key={theme.id} id={theme.id}>
            <span>{theme.index}</span>
            <strong>{theme.title}</strong>
          </li>
        ))}
      </ol>
      <div className="themes__footer">
        <p>{speakingThemeDisclaimer}</p>
        <ActionLink to="/speaking-topics">
          Explore speaking themes
        </ActionLink>
      </div>
    </section>
  );
}
