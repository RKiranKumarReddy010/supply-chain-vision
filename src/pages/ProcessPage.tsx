import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowRight, Search, Database, Sliders, CheckSquare2, CheckCircle2 } from "lucide-react";

const STAGES = [
  {
    step: "01",
    name: "Diagnose & Audit",
    icon: <Search className="w-6 h-6 text-zinc-950" />,
    summary: "Map demand flows, legacy forecasting biases, and SKU inventory constraints.",
    timeline: "Week 1 – 2",
    details: [
      "Historical sales data & point-of-sale telemetry ingestion",
      "Baseline forecast error & bias audit across product families",
      "Lead-time variability and supplier fulfillment constraint mapping",
      "Identification of high-loss SKU-location nodes and stockout risks",
    ],
    deliverable: "Diagnostic Baseline Report & Data Readiness Scorecard",
  },
  {
    step: "02",
    name: "Model & Calibrate",
    icon: <Database className="w-6 h-6 text-zinc-950" />,
    summary: "Train probabilistic forecasting models and calibrate price elasticity curves.",
    timeline: "Week 3 – 5",
    details: [
      "Custom feature engineering (seasonality, holiday spikes, promo calendars)",
      "Neural time-series and gradient-boosted forecasting model training",
      "Price pack architecture & cross-elasticity coefficient calibration",
      "Scenario simulation on historical backtesting holdout sets",
    ],
    deliverable: "Trained Forecast Engine & Elasticity Coefficient Matrix",
  },
  {
    step: "03",
    name: "Optimize & Simulate",
    icon: <Sliders className="w-6 h-6 text-zinc-950" />,
    summary: "Simulate multi-echelon safety stock buffers and margin-maximizing trade spend.",
    timeline: "Week 6 – 7",
    details: [
      "Multi-echelon inventory balancing across distribution nodes",
      "Safety stock calculation with target service level constraints",
      "Trade promotion simulator with incremental volume vs. cost curves",
      "Executive review of recommended inventory buffers and pricing levers",
    ],
    deliverable: "Optimized Inventory Policy Engine & Trade Spend Simulator",
  },
  {
    step: "04",
    name: "Operate & Embed",
    icon: <CheckSquare2 className="w-6 h-6 text-zinc-950" />,
    summary: "Operationalize dashboards, automated replenishment feeds, and monthly S&OP cadences.",
    timeline: "Week 8 & Continuous",
    details: [
      "Live dashboard deployment for commercial, operations, and finance teams",
      "Automated weekly purchase order and reorder alert feeds",
      "Continuous model retraining with new weekly point-of-sale data",
      "S&OP consensus workflow alignment with stakeholder sign-offs",
    ],
    deliverable: "Production Analytics Dashboard & Live PO Recommendation Feeds",
  },
];

export default function ProcessPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden w-full">
      <Nav />

      {/* Hero Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4">
            Structured Engagement
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl font-bold">
            From Raw Data to Real-Time Execution
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Our disciplined 4-stage methodology moves your team from diagnostic clarity to full algorithmic operation without business disruption.
          </p>
        </div>
      </section>

      {/* White Section: Engagement Timeline Overview */}
      <section className="bg-white text-zinc-900 py-16 sm:py-20 md:py-24 border-y border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3 font-semibold">
            Execution Cadence
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-8 sm:mb-12">
            Standard 8-Week Rollout
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STAGES.map((s) => (
              <div key={s.step} className="p-5 sm:p-6 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-zinc-500">{s.timeline}</span>
                    <span className="h-7 w-7 rounded-full bg-zinc-950 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-950 mb-2">
                    {s.name}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {s.summary}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-zinc-200/80 text-[11px] font-mono text-zinc-500 font-medium">
                  {s.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Stages Deep Dive */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Deep Dive
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground">
              Phase-by-Phase Execution Details
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {STAGES.map((s) => (
              <div
                key={s.step}
                className="p-6 sm:p-8 md:p-10 rounded-2xl border border-border bg-card/60 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start hover:border-zinc-500/50 transition-all"
              >
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-400 font-bold px-2.5 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">
                      Phase {s.step}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {s.timeline}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    {s.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.summary}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Core Workstreams & Activities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.details.map((d) => (
                      <div key={d} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-muted-foreground">Key Milestone:</span>
                    <span className="text-foreground font-semibold">{s.deliverable}</span>
                  </div>
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
