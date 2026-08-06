import { useReveal } from "@/hooks/useReveal";

const CASES = [
  {
    sector: "Global FMCG Leader",
    title: "Revenue growth management & trade spend optimization across multi-country portfolio",
    metric: "+6.5%",
    metricLabel: "Net revenue uplift",
  },
  {
    sector: "Industrial Manufacturer",
    title: "SKU-level probabilistic forecasting for 12,000+ SKUs",
    metric: "+11pp",
    metricLabel: "Forecast accuracy",
  },
  {
    sector: "Retail & Distribution Enterprise",
    title: "Point-of-sale analytics and inventory optimization platform",
    metric: "−28%",
    metricLabel: "Decision latency",
  },
];

export default function CaseStudies() {
  const ref = useReveal();
  return (
    <section id="work" className="bg-background border-t border-border">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="flex items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">Selected work</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance max-w-3xl">
              Outcomes, measured in basis points and ship dates.
            </h2>
          </div>
          <a href="#contact" className="hidden md:inline-flex text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            All case studies →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {CASES.map((c) => (
            <article key={c.title} className="bg-background group cursor-pointer">
              {/* Visual block */}
              <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 vignette" />
                <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {c.sector}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="font-display text-6xl md:text-7xl text-foreground">{c.metric}</div>
                  <div className="text-right text-xs uppercase tracking-[0.18em] text-muted-foreground max-w-[40%]">
                    {c.metricLabel}
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10 border-t border-border">
                <h3 className="font-display text-2xl leading-snug">{c.title}</h3>
                <div className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
                  Read the brief
                  <span className="w-8 h-px bg-current group-hover:w-14 transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
