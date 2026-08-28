import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight, Building2, Zap, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Products() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden w-full">
      <Nav />

      {/* Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4">
            Software & Platforms
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.08] tracking-tight max-w-3xl">
            OmniTensors Product Suite
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            From intelligent demand sensing SaaS to automated lead generation engines — explore our specialized software built for enterprise operations.
          </p>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
          
          {/* BHScope — Highlighted in White Card Container */}
          <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 md:p-12 border border-zinc-200 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-zinc-950 text-white rounded-md text-xs font-mono font-bold uppercase tracking-wider">
                    SaaS Platform
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-semibold uppercase tracking-wider">
                    v2.4 Active Release
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-zinc-950 tracking-tight">
                    BHScope
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-zinc-600 font-medium mt-1">
                    SKU-Level Demand Planning & Point-of-Sale Analytics
                  </p>
                </div>

                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                  An algorithmic SaaS platform for demand planning that aligns localized store sales with warehouse replenishment. Predict customer demand with probabilistic models, set profitable discounts, prevent stockouts, and synchronize commercial and logistics teams in real time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Probabilistic time-series demand forecasting",
                    "Promotion sensitivity & uplift scanner",
                    "Dynamic safety stock & reorder buffering",
                    "Cross-location inventory transfer alerts",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-zinc-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Specs Card */}
              <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-5 sm:p-7 md:p-8 border border-zinc-200/90 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-4">
                    Technical Specifications
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-200 gap-1 sm:gap-0">
                      <span className="text-zinc-500">Granularity</span>
                      <span className="text-zinc-900 font-semibold">SKU × Location × Daily</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-200 gap-1 sm:gap-0">
                      <span className="text-zinc-500">Algorithm</span>
                      <span className="text-zinc-900 font-semibold">Neural Time-Series & GBDT</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-200 gap-1 sm:gap-0">
                      <span className="text-zinc-500">Data Formats</span>
                      <span className="text-zinc-900 font-semibold">CSV, REST API, Webhook</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1 sm:gap-0">
                      <span className="text-zinc-500">Deployment</span>
                      <span className="text-zinc-900 font-semibold">Cloud SaaS / Dedicated VPC</span>
                    </div>
                  </div>
                </div>

                <a
                  href="/products/BHScope"
                  className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-zinc-950 text-white font-mono uppercase text-xs tracking-[0.2em] font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3"
                >
                  Launch Interactive Demo <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* LeadForge & Consulting 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* LeadForge */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:border-emerald-400/50 transition-all">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="h-12 w-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/20">
                    Lead Generation
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
                    LeadForge
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Google Maps Lead Finder & AI Outreach Engine
                  </p>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Find local business leads from Google Maps with phone, website, email, and coordinates, then generate personalized outreach copy with AI to accelerate B2B pipeline development.
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    "Google Maps lead mining across target regions",
                    "AI personalized email message generation",
                    "Configurable value proposition & tone settings",
                    "Instant CSV export for CRM pipelines",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-border">
                <a
                  href="/products/LeadForge"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-400 hover:underline"
                >
                  Open Lead Finder Tool <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Consulting & Custom Engagements */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:border-indigo-400/50 transition-all">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="h-12 w-12 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-md text-xs font-mono font-bold uppercase tracking-wider border border-indigo-500/20">
                    Enterprise Services
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
                    Custom Analytics & RGM Consulting
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Bespoke Algorithmic Models for Commercial Teams
                  </p>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Partner directly with our data science team to build custom forecasting models, price elasticity simulators, and multi-echelon inventory policies calibrated to your enterprise infrastructure.
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    "Custom demand sensing algorithms for proprietary data",
                    "Trade promotion management & elasticity curves",
                    "Warehouse network simulation & buffer sizing",
                    "Direct integration with SAP, Oracle, and Postgres",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-border">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-indigo-400 hover:underline"
                >
                  Schedule Technical Scoping <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
