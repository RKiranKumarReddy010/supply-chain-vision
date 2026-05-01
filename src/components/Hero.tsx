import { useRef, Suspense, lazy } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SupplyChainScene = lazy(() => import("./three/SupplyChainScene"));

const STAGES = [
  { id: "01", label: "Signal", title: "Revenue & Supply Intelligence,", title2: "Engineered." },
  { id: "02", label: "Strategy", title: "See demand clearly.", title2: "Price precisely." },
  { id: "03", label: "Execute", title: "From data to decision —", title2: "execute intelligently." },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);
  // active stage index
  const stageIdx = progress < 0.34 ? 0 : progress < 0.7 ? 1 : 2;
  const stage = STAGES[stageIdx];

  return (
    <section id="top" ref={ref} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D canvas layer */}
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-radial" style={{ background: "var(--gradient-radial)" }} />}>
            <SupplyChainScene progress={progress} />
          </Suspense>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none vignette" />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 grid-bg" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }} />

        {/* Top label */}
        <div className="absolute top-24 left-0 right-0 px-6 lg:px-10 pointer-events-none">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span>Omnitensor Core · v3.0</span>
            <span>Network Sim · Active</span>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-start pt-32 md:pt-0 md:items-center pointer-events-none z-10">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-foreground" />
                <span>{stage.id} / {stage.label}</span>
              </div>
              <h1
                key={stageIdx}
                className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-balance animate-fade-in"
              >
                {stage.title}
                <br />
                <span className="text-muted-foreground">{stage.title2}</span>
              </h1>
              <p className="mt-8 max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed">
                We build the decision engine behind how businesses grow — connecting data, models, and execution from signal to strategy across revenue and supply chains.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom progress bar + stages */}
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-10 pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-muted-foreground">
              {STAGES.map((s, i) => (
                <span key={s.id} className={i === stageIdx ? "text-foreground" : ""}>
                  {s.id} <span className="hidden sm:inline">· {s.label}</span>
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
              Scroll to advance shipment →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
