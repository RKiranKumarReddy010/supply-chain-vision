import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowRight, CheckCircle2, Cpu, TrendingUp, Layers, BarChart3 } from "lucide-react";

const SERVICES_DATA = [
  {
    num: "01",
    icon: <BarChart3 className="w-7 h-7 text-foreground" />,
    title: "Demand Planning & Sales Forecasting",
    subtitle: "Turn market signals into high-precision SKU-level demand plans.",
    desc: "Eliminate forecast blindness with advanced statistical and machine learning models tailored for multi-echelon supply chains. We build hierarchical time-series models that account for seasonality, trend shifts, promotions, and real-time point-of-sale signals.",
    capabilities: [
      "Hierarchical & SKU-location level forecasting",
      "Demand sensing with real-time point-of-sale data",
      "Probabilistic forecasting with confidence intervals",
      "Sales & Operations Planning (S&OP) alignment",
      "Automated forecast error tracking (MAPE, WAPE, Bias)",
    ],
    deliverables: [
      "Dynamic Demand Forecast Engine",
      "Exception-based Alert Dashboard",
      "Automated Monthly S&OP Workbooks",
    ],
  },
  {
    num: "02",
    icon: <TrendingUp className="w-7 h-7 text-foreground" />,
    title: "Revenue Growth Management (RGM)",
    subtitle: "Optimize pricing, trade promotions, and product mix for maximum margin.",
    desc: "Bridge the gap between commercial strategy and supply reality. Our RGM solutions model price elasticities, quantify promotion incrementality, and eliminate unprofitable trade spend while safeguarding volume targets.",
    capabilities: [
      "Cross-price & own-price elasticity modeling",
      "Trade promotion management & ROI evaluation",
      "Price pack architecture & bundle optimization",
      "Gross-to-Net margin bridge analysis",
      "Channel & distributor margin strategy",
    ],
    deliverables: [
      "Interactive Pricing Simulator",
      "Promotion ROI & Incrementality Matrix",
      "Pack Architecture Opportunity Maps",
    ],
  },
  {
    num: "03",
    icon: <Layers className="w-7 h-7 text-foreground" />,
    title: "Supply Chain & Inventory Solutions",
    subtitle: "Synchronize inventory buffers, lead times, and warehouse stock levels.",
    desc: "Maintain maximum service levels while minimizing tied-up capital. We design dynamic safety stock policies, calculate optimal reorder points, and optimize distribution routes across central hubs and regional fulfillment centers.",
    capabilities: [
      "Multi-echelon safety stock optimization (MEIO)",
      "Dynamic reorder point & EOQ calculation",
      "Lead time variability & supplier risk scoring",
      "Stockout prevention & backorder risk mitigation",
      "Warehouse capacity & replenishment pacing",
    ],
    deliverables: [
      "Inventory Health & Buffer Dashboard",
      "Automated Purchase Order Recommendation Feeds",
      "Network Rebalancing Protocols",
    ],
  },
  {
    num: "04",
    icon: <Cpu className="w-7 h-7 text-foreground" />,
    title: "FMCG & Retail Analytics",
    subtitle: "Custom-engineered intelligence platforms for high-velocity retail operations.",
    desc: "From quick commerce dark stores to modern trade supermarket chains, we deploy bespoke analytics platforms that process high-frequency sales data and provide instant operational intelligence.",
    capabilities: [
      "Point-of-Sale (POS) & scan-data harmonization",
      "Quick commerce hyper-local demand forecasting",
      "Assortment rationalization & space planning insights",
      "Distributor fill-rate & on-shelf availability analytics",
      "Custom ERP & database integrations",
    ],
    deliverables: [
      "Enterprise Retail Business Intelligence Suite",
      "Daily Store Fulfillment Action Queues",
      "Executive Growth & Margin Cockpit",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden w-full">
      <Nav />

      {/* Hero Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4">
            Specialized Capabilities
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl font-bold">
            Enterprise Services for Demand & Supply Intelligence
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Four core capabilities engineered to forecast demand accurately, price strategically, balance working capital, and accelerate profitable growth.
          </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
          {SERVICES_DATA.map((s, idx) => (
            <div
              key={s.num}
              id={`service-${s.num}`}
              className="p-6 sm:p-8 md:p-12 rounded-3xl border border-border bg-card/60 scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-zinc-500/40 transition-all"
            >
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-foreground border border-foreground/30 px-2.5 py-1 rounded bg-foreground/5">
                    {s.num}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Pillar
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface border border-border">
                    {s.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
                    {s.title}
                  </h2>
                </div>

                <p className="text-sm font-mono text-primary font-medium">
                  {s.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>

                <div className="pt-2">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-foreground hover:underline"
                  >
                    Consult on this capability <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 bg-surface rounded-2xl p-5 sm:p-7 md:p-8 border border-border space-y-5">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                    Key Analytical Capabilities
                  </div>
                  <div className="space-y-2.5">
                    {s.capabilities.map((c) => (
                      <div key={c} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">
                    Primary Deliverables
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-background border border-border text-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
