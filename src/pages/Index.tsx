import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { ArrowRight, BarChart3, TrendingUp, Layers, ShieldCheck, Zap } from "lucide-react";

export default function Index() {
  return (
    <main className="bg-background text-foreground w-full">
      <Nav />
      <Hero />

      {/* ── SEAMLESS TRANSITION MARQUEE RIBBON ── */}
      <div className="relative z-20 w-full overflow-hidden bg-background">
        <Marquee />
      </div>

      {/* ── WHITE CONTAINER SECTION: CORE VALUE PROPOSITION ── */}
      <section className="bg-white text-zinc-900 py-16 sm:py-20 md:py-28 border-b border-zinc-200 relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3 font-semibold">
                Algorithmic Operating System
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 max-w-3xl leading-[1.1]">
                Intelligent Supply Chain & Margin Optimization
              </h2>
            </div>
            <a
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] font-bold text-zinc-950 hover:opacity-75 transition-opacity"
            >
              Explore Capabilities <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 mb-3">
                AI Demand Forecasting
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Hierarchical, SKU-location level probabilistic forecasting that incorporates promotional calendars, localized seasonality, and real-time point-of-sale signals.
              </p>
              <a href="/services#service-01" className="text-xs font-mono uppercase font-bold text-zinc-950 inline-flex items-center gap-1 hover:underline">
                Learn more →
              </a>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 mb-3">
                Revenue Growth Management
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Price elasticity modeling, trade spend incrementality tracking, and margin-optimizing pack architecture to protect enterprise margins.
              </p>
              <a href="/services#service-02" className="text-xs font-mono uppercase font-bold text-zinc-950 inline-flex items-center gap-1 hover:underline">
                Learn more →
              </a>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 mb-3">
                Inventory Synchronization
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Multi-echelon safety stock balancing and automated reorder triggers that eliminate stockouts while minimizing working capital drag.
              </p>
              <a href="/services#service-03" className="text-xs font-mono uppercase font-bold text-zinc-950 inline-flex items-center gap-1 hover:underline">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SPOTLIGHT SECTION ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Technology Platforms
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
                Software Built for Commercial Scale
              </h2>
            </div>
            <a
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              All Products & Tools →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* BHScope Card (White container design) */}
            <div className="bg-white text-zinc-900 rounded-2xl p-6 sm:p-8 lg:p-10 border border-zinc-200 shadow-xl flex flex-col justify-between group hover:border-zinc-400 transition-all">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-zinc-950 text-white rounded">
                    SaaS Platform
                  </span>
                  <span className="font-mono text-xs text-zinc-500 font-semibold">
                    v2.4 Production
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 mb-1.5">
                    BHScope
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-600 font-medium">
                    SKU-Level Demand Planning & Point-of-Sale Analytics
                  </p>
                </div>
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed">
                  An intelligent SaaS platform that aligns store sales with warehouse replenishment. Real-time demand sensing, automated purchase recommendations, and inventory health tracking.
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    "Item & store level probabilistic demand forecasting",
                    "Automated reorder point calculation with lead-time buffering",
                    "Promotion calendar & margin tracking engine",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-zinc-700 font-medium">
                      <ShieldCheck className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-zinc-200 flex items-center justify-between">
                <a
                  href="/products/BHScope"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-zinc-950 hover:underline"
                >
                  Open Live Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* LeadForge Card */}
            <div className="bg-card text-foreground rounded-2xl p-6 sm:p-8 lg:p-10 border border-border flex flex-col justify-between group hover:border-zinc-500 transition-all">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                    Lead Engine
                  </span>
                  <span className="font-mono text-xs text-muted-foreground font-semibold">
                    AI Automated
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1.5">
                    LeadForge
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                    Google Maps Lead Finder & AI Outreach
                  </p>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Find local business leads from Google Maps with phone, website, email, and location telemetry, then generate personalized AI outreach messages to accelerate commercial pipeline.
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    "Automated Google Maps business data extraction",
                    "AI personalized outreach email generation",
                    "CSV export for CRM integrations",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-border flex items-center justify-between">
                <a
                  href="/products/LeadForge"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-400 hover:underline"
                >
                  Launch Lead Finder <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MULTI-PAGE NAVIGATION HUB (PAGES TEASER) ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-secondary/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Structured Sections
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-12 sm:mb-16">
            Explore OmniTensors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Services Page Hub */}
            <a
              href="/services"
              className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-foreground transition-all flex flex-col justify-between h-full"
            >
              <div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
                  01 · Offerings
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Services
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Deep dive into our 4 core pillars: Demand Planning, RGM Analytics, Inventory Optimization, and FMCG Intelligence.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Process Page Hub */}
            <a
              href="/process"
              className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-foreground transition-all flex flex-col justify-between h-full"
            >
              <div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
                  02 · Methodology
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Process
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Understand our 4-phase rollout framework: Diagnose, Model, Optimize, and Operate across an 8-week structured roadmap.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                <span>View Full Process</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Solutions Page Hub */}
            <a
              href="/work"
              className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-foreground transition-all flex flex-col justify-between h-full"
            >
              <div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
                  03 · Domain Focus
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Industry Solutions
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Operational problem statements and architectural blueprints for FMCG, Modern Retail, Quick Commerce, and Industrial Manufacturing.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
