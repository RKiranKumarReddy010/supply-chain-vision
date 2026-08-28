import { useRef, Suspense, lazy } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SupplyChainScene = lazy(() => import("./three/SupplyChainScene"));

const STAGES = [
  { id: "01", label: "Forecast", title: "Predict Demand.", title2: "AI-powered sales forecasting." },
  { id: "02", label: "Optimize", title: "Optimize Supply.", title2: "Precision pricing & inventory." },
  { id: "03", label: "Execute", title: "Execute Strategy.", title2: "SKU-level intelligence." },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);
  // active stage index
  const stageIdx = progress < 0.34 ? 0 : progress < 0.7 ? 1 : 2;
  const stage = STAGES[stageIdx];

  return (
    <section id="top" ref={ref} className="relative h-[220vh] md:h-[280vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
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
        <div className="absolute top-20 sm:top-24 left-0 right-0 px-4 sm:px-6 lg:px-10 pointer-events-none">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">
            <span>OMNITENSORS Core ·</span>
            <span>Network Sim · Active</span>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-start pt-28 sm:pt-36 md:pt-0 md:items-center pointer-events-none z-10">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-10 grid grid-cols-12 gap-4 sm:gap-6 pb-24 md:pb-20">
            <div className="col-span-12 lg:col-span-8">
              <h1
                key={stageIdx}
                className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.05] sm:leading-[0.98] text-balance animate-fade-in font-bold"
              >
                {stage.title}
                <br />
                <span className="text-muted-foreground font-medium">{stage.title2}</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom progress bar + stages */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 px-4 sm:px-6 lg:px-10 z-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-3 mb-2.5 text-[9px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-muted-foreground">
              {STAGES.map((s, i) => (
                <span
                  key={s.id}
                  className={`${i === 1 ? "text-center" : i === 2 ? "text-right" : "text-left"} ${
                    i === stageIdx ? "text-foreground font-semibold" : ""
                  }`}
                >
                  {s.id} <span className="inline">· {s.label}</span>
                </span>
              ))}
            </div>
            <div className="h-[2px] sm:h-px w-full bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
              />
            </div>
            <div className="mt-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-muted-foreground flex items-center justify-between">
              <span>Scroll to advance simulation →</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
