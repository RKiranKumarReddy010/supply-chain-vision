import { useReveal } from "@/hooks/useReveal";

const STEPS = [
  { n: "01", t: "Diagnose", d: "Map current-state flows, costs, and service. Identify the constraints that matter." },
  { n: "02", t: "Model", d: "Build digital twins of your network. Simulate scenarios at decision-grade fidelity." },
  { n: "03", t: "Optimize", d: "Run multi-objective optimization. Balance cost, service, and carbon together." },
  { n: "04", t: "Operate", d: "Embed dashboards and decision agents into the daily rhythm of your operations." },
];

export default function Process() {
  const ref = useReveal();
  return (
    <section id="process" className="bg-background border-t border-border">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">Process</div>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mb-20 text-balance max-w-4xl">
          A four-step engagement, calibrated to your decision velocity.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border relative">
          {STEPS.map((s, i) => (
            <div key={s.n} className="bg-background p-8 lg:p-10 relative">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-muted-foreground tracking-[0.2em]">{s.n}</span>
                <span className="flex-1 h-px bg-border" />
                {i < STEPS.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
              <h3 className="font-display text-2xl mb-4">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
