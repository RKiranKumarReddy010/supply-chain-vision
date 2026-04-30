import { useRef, Suspense, lazy } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const PhoneInHand = lazy(() => import("./three/PhoneInHand"));

const SOCIALS = [
  { name: "Instagram", handle: "@omnitensor", url: "https://instagram.com/" },
  { name: "Facebook", handle: "/omnitensor", url: "https://facebook.com/" },
  { name: "Twitter / X", handle: "@omnitensor", url: "https://twitter.com/" },
  { name: "LinkedIn", handle: "/company/omnitensor", url: "https://linkedin.com/" },
];

export default function Connect() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);
  const activeIdx = Math.min(SOCIALS.length - 1, Math.floor(progress * SOCIALS.length));

  return (
    <section id="connect" ref={ref} className="relative bg-background border-t border-border" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full" style={{ background: "var(--gradient-radial)" }} />}>
            <PhoneInHand progress={progress} />
          </Suspense>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none vignette" />

        {/* Top label */}
        <div className="absolute top-10 left-0 right-0 px-6 lg:px-10 pointer-events-none">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span>Channel · {String(activeIdx + 1).padStart(2, "0")} / {String(SOCIALS.length).padStart(2, "0")}</span>
            <span>Scroll · Swipe Active</span>
          </div>
        </div>

        {/* Left content */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-foreground" />
                <span>Connect</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-balance">
                Find us on every<br />
                <span className="text-muted-foreground">channel.</span>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground text-base leading-relaxed">
                Scroll to swipe through our social channels. The conversation continues across platforms — drop in wherever you live.
              </p>

              {/* Animated active social */}
              <div className="mt-10 pointer-events-auto">
                <a
                  key={activeIdx}
                  href={SOCIALS[activeIdx].url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-4 border border-border-strong px-5 py-4 hover:bg-foreground hover:text-background transition-colors animate-fade-in"
                >
                  <span className="font-display text-lg">{SOCIALS[activeIdx].name}</span>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-background">
                    {SOCIALS[activeIdx].handle}
                  </span>
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom progress indicator */}
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-10 pb-8 pointer-events-none">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {SOCIALS.map((s, i) => (
                <span key={s.name} className={i === activeIdx ? "text-foreground" : ""}>
                  {String(i + 1).padStart(2, "0")} · {s.name}
                </span>
              ))}
            </div>
            <div className="h-px w-full bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
              />
            </div>
            <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Scroll to swipe phone →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
