import { useReveal } from "@/hooks/useReveal";

const SERVICES = [
  {
    n: "01",
    t: "Demand Planning & Sales Forecasting",
    d: "Convert uncertainty into confident decisions — SKU-level sales forecasting, demand sensing, and S&OP planning you can run a business on.",
    p: ["SKU-Level Forecasting", "Probabilistic Forecasting", "Demand Sensing", "S&OP Planning", "Forecast Accuracy"],
  },
  {
    n: "02",
    t: "Revenue Growth Management",
    d: "Turn pricing, promotion, and assortment into measurable profit — RGM analytics, trade spend optimization, and net revenue management.",
    p: ["Price Elasticity Modeling", "Price Pack Architecture", "Trade Spend Optimization", "Promotion Incrementality", "Margin Optimization"],
  },
  {
    n: "03",
    t: "Supply Chain Solutions",
    d: "Modular supply chain solutions with end-to-end visibility across lead times, safety stock, and distribution networks — balanced inventory at the right store and warehouse.",
    p: ["Inventory Optimization", "Supply Chain Solution", "Distribution Channel Analytics", "Sales Forecasting"],
  },
  {
    n: "04",
    t: "FMCG & Retail Analytics",
    d: "Custom-built analytics for FMCG, retail business intelligence, and quick commerce — operationalized at scale.",
    p: ["FMCG Analytics", "Retail Business Intelligence", "Mid-Retail Analytics", "Time-Series Analytics", "Custom Software"],
  },
];

export default function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="bg-background">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Services</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance">
              Predictive Demand Planning &<br />
              <span className="text-muted-foreground">Sales Forecasting Engine</span>
            </h2>
            <h2 className="mt-6 font-display text-2xl md:text-3xl leading-[1.02] text-balance">
              Revenue Growth Management (RGM) & Supply Chain Solutions
            </h2>
            <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
              Our <strong className="font-semibold text-foreground">demand planning</strong> analytics engine reduces forecast error at SKU level, while our <strong className="font-semibold text-foreground">RGM solutions</strong> optimize price-pack architecture and trade promotion spend. Together they give enterprise teams a complete <strong className="font-semibold text-foreground">supply chain solution</strong> — demand planning, sales forecasting, and revenue growth management in one operating system.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-border">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="group bg-background p-8 lg:p-10 hover:bg-secondary/40 transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs text-muted-foreground tracking-[0.2em]">{s.n}</span>
                <span className="w-8 h-px bg-border-strong group-hover:w-16 transition-all duration-500" />
              </div>
              <h3 className="font-display text-2xl mb-4">{s.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              <ul className="mt-8 space-y-2 text-sm">
                {s.p.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-foreground/80">
                    <span className="w-1 h-1 bg-foreground rounded-full" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
