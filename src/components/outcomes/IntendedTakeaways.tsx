import { homepageCopy, takeaways } from "../../content/siteContent";

export function IntendedTakeaways() {
  return (
    <section
      id="impact"
      data-home-chapter
      className="takeaways home-chapter section section--dark"
    >
      <p className="section-label">Intended takeaways</p>
      <h2 className="display display--section">
        {homepageCopy.takeaways.heading}
      </h2>
      <p className="takeaways__intro">
        {homepageCopy.takeaways.intro}
      </p>
      <ol className="takeaways__list">
        {takeaways.map((takeaway, index) => (
          <li key={takeaway}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{takeaway}</p>
          </li>
        ))}
      </ol>
      <p className="takeaways__disclaimer">
        {homepageCopy.takeaways.disclaimer}
      </p>
    </section>
  );
}
