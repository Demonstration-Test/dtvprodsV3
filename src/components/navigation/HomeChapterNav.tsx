import { useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  homeChapters,
  isHomeChapterId,
  selectActiveChapter,
  type ChapterVisibility,
  type HomeChapterId,
} from "../../lib/navigation/homeChapters";

function chapterFromHash(): HomeChapterId {
  const hash = window.location.hash.replace(/^#/, "");
  return isHomeChapterId(hash) ? hash : "home";
}

function isShortViewport() {
  return (
    window.innerHeight < 680 ||
    (window.innerWidth < 1024 && window.innerWidth > window.innerHeight)
  );
}

export function HomeChapterNav() {
  const [activeId, setActiveId] = useState<HomeChapterId>(chapterFromHash);
  const [shortViewport, setShortViewport] = useState(isShortViewport);

  useEffect(() => {
    const onResize = () => setShortViewport(isShortViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const goToHash = () => {
      const id = chapterFromHash();
      setActiveId(id);
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    };

    if (window.location.hash) {
      goToHash();
    }
    window.addEventListener("popstate", goToHash);
    return () => window.removeEventListener("popstate", goToHash);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const visibility = new Map<HomeChapterId, ChapterVisibility>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isHomeChapterId(entry.target.id)) {
            return;
          }
          visibility.set(entry.target.id, {
            id: entry.target.id,
            intersectionRatio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
            bottom: entry.boundingClientRect.bottom,
          });
        });
        const nextId = selectActiveChapter(
          Array.from(visibility.values()),
          window.innerHeight,
        );
        if (nextId) {
          setActiveId(nextId);
        }
      },
      {
        rootMargin: "-15% 0px -15% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    homeChapters.forEach(({ id }) => {
      const chapter = document.getElementById(id);
      if (chapter) {
        observer.observe(chapter);
      }
    });

    return () => observer.disconnect();
  }, []);

  const visibleChapters = useMemo(() => {
    if (!shortViewport) {
      return homeChapters.map((chapter) => ({
        ...chapter,
        relation: "destination" as const,
      }));
    }

    const activeIndex = homeChapters.findIndex(
      (chapter) => chapter.id === activeId,
    );
    const previous =
      homeChapters[
        (activeIndex - 1 + homeChapters.length) % homeChapters.length
      ];
    const current = homeChapters[activeIndex];
    const next = homeChapters[(activeIndex + 1) % homeChapters.length];

    return [
      { ...previous, relation: "previous" as const },
      { ...current, relation: "current" as const },
      { ...next, relation: "next" as const },
    ];
  }, [activeId, shortViewport]);

  function navigateTo(
    event: MouseEvent<HTMLAnchorElement>,
    id: HomeChapterId,
  ) {
    event.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <nav
      className={
        shortViewport
          ? "home-chapter-nav home-chapter-nav--compact"
          : "home-chapter-nav"
      }
      aria-label="Homepage sections"
    >
      <ol>
        {visibleChapters.map((chapter) => {
          const isActive = chapter.id === activeId;
          const accessibleName =
            chapter.relation === "destination"
              ? chapter.label
              : `${chapter.relation} section: ${chapter.label}`;

          return (
            <li key={`${chapter.relation}-${chapter.id}`}>
              <a
                href={`#${chapter.id}`}
                aria-label={accessibleName}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => navigateTo(event, chapter.id)}
              >
                <span className="home-chapter-nav__dot" aria-hidden="true" />
                <span className="home-chapter-nav__label">
                  {chapter.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
