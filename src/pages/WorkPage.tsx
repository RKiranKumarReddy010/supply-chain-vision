import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowRight, ShoppingBag, Store, Factory, ShieldCheck, Zap } from "lucide-react";

const INDUSTRIES = [
  {
    icon: <ShoppingBag className="w-7 h-7 text-zinc-950" />,
    sector: "Fast Moving Consumer Goods (FMCG)",
    title: "Trade Spend Optimization & SKU-Level Demand Sensing",
    challenge: "High SKU proliferation, unpredictable promotional cannibalization, and heavy trade spend without clear incrementality visibility.",
    solution: "We implement daily demand sensing models integrated with promotional calendars and trade spend elasticity curves to eliminate stockouts during major campaigns and prevent post-promotion inventory overhang.",
    capabilities: [
      "Promotion incrementality vs. baseline decomposition",
      "Trade spend ROI optimization by retailer channel",
      "Dynamic safety stock buffers for short shelf-life SKUs",
      "Distributor pipeline fill rate forecasting",
    ],
  },
  {
    icon: <Store className="w-7 h-7 text-zinc-950" />,
    title: "Store-Level Replenishment & Margin Protection",
    sector: "Modern Trade & Supermarket Chains",
    challenge: "Managing thousands of store-SKU combinations with varying consumer demographics, limited backroom capacity, and perishable shrink risk.",
    solution: "Our algorithms automate localized store order recommendations based on point-of-sale scan velocity, local weather, holidays, and delivery frequency constraints.",
    capabilities: [
      "Store-specific reorder point & safety stock pacing",
      "Price elasticity modeling for private label vs. national brands",
      "Perishable shrink & markdown optimization",
      "Cross-category basket & assortment mix planning",
    ],
  },
  {
    icon: <Zap className="w-7 h-7 text-zinc-950" />,
    title: "Hyper-Local Inventory Buffers & 15-Min Fulfillment",
    sector: "Quick Commerce & Dark Stores",
    challenge: "Extreme order volatility, strict 10-to-20 minute SLA promises, and minimal dark store storage footprint requiring daily multi-drop replenishment.",
    solution: "We build ultra-high frequency time-series models that predict hourly demand spikes per micro-catchment area, dynamically rebalancing hub-to-spoke stock allocations.",
    capabilities: [
      "Hourly demand spike prediction per micro-warehouse",
      "Intra-day stock transfer & replenishment triggers",
      "Out-of-stock risk scoring across peak order windows",
      "Assortment velocity tiering for dark store picking efficiency",
    ],
  },
  {
    icon: <Factory className="w-7 h-7 text-zinc-950" />,
    title: "Lead Time Variability & Raw Material Synchronization",
    sector: "Industrial & Manufacturing Supply Chains",
    challenge: "Uncertain vendor lead times, volatile raw material costs, and bullwhip effects cascading across multi-tier manufacturing operations.",
    solution: "We model end-to-end supply lead-time distributions and buffer finished goods alongside raw materials to ensure continuous production without capital drag.",
    capabilities: [
      "Stochastic lead time & supplier reliability modeling",
      "Bill of Materials (BOM) explosion demand synchronization",
      "Safety stock optimization under supply lead-time volatility",
      "Capacity-constrained production planning inputs",
    ],
  },
];

export default function WorkPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden w-full">
      <Nav />

      {/* Hero Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4">
            Domain Focus
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl font-bold">
            Industry Solutions & Strategic Problem Archetypes
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Every supply chain is unique, but the mathematical failure modes are consistent. Here is how we apply our analytics engines to address critical operational bottlenecks.
          </p>
        </div>
      </section>

      {/* White Section: Architectural Principles */}
      <section className="bg-white text-zinc-900 py-16 sm:py-20 md:py-24 border-y border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3 font-semibold">
            Our Standard
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-8 sm:mb-12">
            Built on Rigorous Mathematical Foundations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 mb-2.5">
                No Black Boxes
              </h3>
              <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                Every forecast output decomposes into clean baseline, promotional uplift, seasonality, and trend components for total stakeholder trust.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 mb-2.5">
                Probabilistic Ranges
              </h3>
              <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                Single-point forecasts fail under volatility. We produce P10, P50, and P90 confidence spreads to calibrate safety buffers accurately.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 mb-2.5">
                Commercial & Ops Link
              </h3>
              <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                We align marketing's promotional plans directly with logistics warehouse capacity, preventing post-campaign inventory overhang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Sector Playbooks
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground">
              Tailored Analytics by Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.sector}
                className="p-6 sm:p-8 md:p-10 rounded-3xl border border-border bg-card flex flex-col justify-between hover:border-zinc-500/50 transition-all"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="font-mono text-xs text-primary font-bold px-3 py-1 bg-surface rounded-md border border-border">
                      {ind.sector}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    {ind.title}
                  </h3>

                  <div className="space-y-3 pt-1">
                    <div className="p-4 rounded-xl bg-surface border border-border/80 text-xs text-muted-foreground space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-bold block">
                        The Bottleneck:
                      </span>
                      <span>{ind.challenge}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-border/80 text-xs text-zinc-300 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                        Our Algorithmic Solution:
                      </span>
                      <span>{ind.solution}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">
                      Core Implementations
                    </div>
                    <div className="space-y-2">
                      {ind.capabilities.map((c) => (
                        <div key={c} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-foreground hover:underline"
                  >
                    Discuss this sector blueprint <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
