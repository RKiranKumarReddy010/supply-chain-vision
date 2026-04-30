import { useRef, Suspense, lazy } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const PhoneInHand = lazy(() => import("./three/PhoneInHand"));

const SOCIALS = [
  { name: "Instagram", handle: "@omnitensor", url: "https://instagram.com/", icon: "IG" },
  { name: "Facebook", handle: "/omnitensor", url: "https://facebook.com/", icon: "FB" },
  { name: "Twitter / X", handle: "@omnitensor", url: "https://twitter.com/", icon: "X" },
  { name: "LinkedIn", handle: "/company/omnitensor", url: "https://linkedin.com/", icon: "IN" },
];

export default function Connect() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);

  // Background gradient hue shift across scroll
  const hue1 = 220 + progress * 140; // 220 -> 360
  const hue2 = 280 + progress * 80;
  const bg = `radial-gradient(ellipse at ${20 + progress * 60}% 40%, hsl(${hue1} 35% 12%) 0%, hsl(${hue2} 30% 6%) 45%, hsl(0 0% 3%) 90%)`;

  // How many social chips have "popped up"
  const visibleCount = Math.min(SOCIALS.length, Math.floor(progress * (SOCIALS.length + 0.5)) + (progress > 0.05 ? 1 : 0));

  return (
    <section
      id="connect"
      ref={ref}
      className="relative border-t border-border"
      style={{ height: "260vh", background: bg, transition: "background 200ms linear" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Page-grid backdrop so the "site" feels visible behind the man */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          }}
        />

        {/* Headings overlay */}
        <div className="absolute top-0 inset-x-0 px-6 lg:px-10 pt-24 pointer-events-none z-10">
          <div className="mx-auto max-w-7xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-foreground" />
              <span>Connect · Walk with us</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance max-w-4xl">
              Carry the conversation.<br />
              <span className="text-muted-foreground">Find us anywhere.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground text-base leading-relaxed">
              Scroll to walk our messenger across your screen — channels appear as he passes by.
            </p>
          </div>
        </div>

        {/* 3D man canvas — transparent so the gradient + grid show through */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <PhoneInHand progress={progress} />
          </Suspense>
        </div>

        {/* Bottom social chips that pop up one-by-one */}
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-10 pb-12 z-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {SOCIALS.map((s, i) => {
                const visible = i < visibleCount;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 border border-border-strong bg-background/60 backdrop-blur-md px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.9)",
                      transitionProperty: "opacity, transform, background-color, color",
                      transitionDuration: "500ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay: visible ? `${i * 60}ms` : "0ms",
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-background/70">
                      {s.icon}
                    </span>
                    <span className="font-display text-base">{s.name}</span>
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-background/70">
                      {s.handle}
                    </span>
                    <span className="text-base">→</span>
                  </a>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-px w-full bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
              />
            </div>
            <div className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Scroll to walk →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
