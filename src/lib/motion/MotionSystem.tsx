import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import {
  selectMotionProfile,
  type MotionProfile,
} from "./performanceProfile";

const staticProfile: MotionProfile = {
  mode: "static",
  reason: "viewport",
  allowLenis: false,
  allowWebgl: false,
  allowCursor: false,
  allowPinned: false,
  allowAutoplay: false,
};

const MotionProfileContext = createContext<MotionProfile>(staticProfile);

function supportsWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

function readProfile() {
  const navigatorWithHints = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const saveData = Boolean(navigatorWithHints.connection?.saveData);
  const shouldProbeWebgl =
    !prefersReducedMotion && !saveData && window.innerWidth >= 768;
  return selectMotionProfile({
    prefersReducedMotion,
    saveData,
    viewportWidth: window.innerWidth,
    deviceMemory: navigatorWithHints.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    webglSupported: shouldProbeWebgl ? supportsWebgl() : true,
  });
}

export function MotionSystem({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<MotionProfile>(staticProfile);

  useEffect(() => {
    const refresh = () => setProfile(readProfile());
    refresh();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", refresh);
    window.addEventListener("resize", refresh, { passive: true });
    return () => {
      media.removeEventListener("change", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = profile.mode;
    document.documentElement.dataset.motionReason = profile.reason;
  }, [profile]);

  const value = useMemo(() => profile, [profile]);
  return (
    <MotionProfileContext.Provider value={value}>
      {children}
      <LenisCoordinator />
      <CinematicReveals />
      <CustomCursor />
    </MotionProfileContext.Provider>
  );
}

export function useMotionProfile() {
  return useContext(MotionProfileContext);
}

function LenisCoordinator() {
  const profile = useMotionProfile();

  useEffect(() => {
    if (!profile.allowLenis) return;
    let disposed = false;
    let frame = 0;
    let destroy = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -96 },
      });
      const tick = (time: number) => {
        lenis.raf(time);
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
      destroy = () => {
        window.cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      destroy();
    };
  }, [profile.allowLenis]);

  return null;
}

function CinematicReveals() {
  const profile = useMotionProfile();
  const location = useLocation();

  useEffect(() => {
    if (profile.mode !== "enhanced") return;
    let disposed = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, triggerModule]) => {
        if (disposed) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          if (document.querySelector(".hero")) {
            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .from(".hero__label", { opacity: 0, y: 18, duration: 0.55 })
              .from(
                ".hero .display--hero > span",
                {
                  opacity: 0,
                  yPercent: 70,
                  duration: 0.82,
                  stagger: 0.12,
                },
                "-=0.25",
              )
              .from(
                ".hero__support, .hero__actions, .hero__meta",
                {
                  opacity: 0,
                  y: 24,
                  duration: 0.65,
                  stagger: 0.1,
                },
                "-=0.35",
              )
              .from(
                ".hero__portrait",
                {
                  opacity: 0,
                  xPercent: 8,
                  filter: "blur(12px)",
                  duration: 1.1,
                },
                0.1,
              );
          }

          gsap.utils
            .toArray<HTMLElement>(
              ".section:not(.hero) .display, .section:not(.hero) .section-label",
            )
            .forEach((element) => {
              gsap.from(element, {
                opacity: 0,
                y: 48,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                },
              });
            });

          gsap.utils
            .toArray<HTMLElement>(
              ".frame img, .numbered-card, .audience-link-grid article",
            )
            .forEach((element) => {
              gsap.from(element, {
                opacity: 0,
                scale: 1.035,
                y: 28,
                duration: 0.95,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 91%",
                  once: true,
                },
              });
            });
        });
        ScrollTrigger.refresh();
        cleanup = () => context.revert();
      },
    );

    return () => {
      disposed = true;
      cleanup();
    };
  }, [location.pathname, profile.mode]);

  return null;
}

function CustomCursor() {
  const profile = useMotionProfile();
  const [state, setState] = useState({ x: -100, y: -100, active: false });

  useEffect(() => {
    if (!profile.allowCursor) return;
    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setState({
        x: event.clientX,
        y: event.clientY,
        active: Boolean(target?.closest("a, button, summary, input, select, textarea")),
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [profile.allowCursor]);

  if (!profile.allowCursor) return null;
  return (
    <div
      className={`focus-cursor${state.active ? " focus-cursor--active" : ""}`}
      style={{ transform: `translate3d(${state.x}px, ${state.y}px, 0)` }}
      aria-hidden="true"
    >
      <span>{state.active ? "VIEW" : "FOCUS"}</span>
    </div>
  );
}
