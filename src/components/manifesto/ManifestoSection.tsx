import { homepageCopy } from "../../content/siteContent";

export function ManifestoSection() {
  return (
    <section className="manifesto section section--light">
      <div className="section__index camera-meta">PRINCIPLE / 01</div>
      <div className="manifesto__grid">
        <h2 className="display display--statement">
          You do not have to
          <br />
          see the entire road
          <br />
          to take the next step.
        </h2>
        <blockquote>{homepageCopy.manifesto.definition}</blockquote>
      </div>
    </section>
  );
}
