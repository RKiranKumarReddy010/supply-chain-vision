import { useReveal } from "@/hooks/useReveal";

const SERVICES = [
  {
    n: "01",
    t: "Supply Chain Analytics",
    d: "Telemetry-grade visibility across every node. We unify ERP, WMS, and TMS data into a single decision surface.",
    p: ["Network observability", "Inventory health scoring", "Lead-time variance models"],
  },
  {
    n: "02",
    t: "Network Optimization",
    d: "Mathematical optimization of facilities, lanes, and modes — sized to your service-level commitments.",
    p: ["Greenfield & brownfield design", "Lane & mode optimization", "Carbon-aware routing"],
  },
  {
    n: "03",
    t: "Demand Forecasting",
    d: "Hierarchical, probabilistic forecasts that translate uncertainty into stocking and capacity decisions.",
    p: ["SKU-location forecasts", "New-product modeling", "S&OP integration"],
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
              Three disciplines.<br />
              <span className="text-muted-foreground">One operating system for your network.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
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
