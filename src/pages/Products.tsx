import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, TrendingUp, Warehouse, Zap } from "lucide-react";

export default function Products() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 pt-28 pb-20 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-wider font-semibold mb-4">
            <Zap className="h-4 w-4" />
            <span>Our Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
            OmniTensors products for demand planning & sales forecasting
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            From AI-powered inventory optimization to SKU-level forecasting and revenue growth management — explore our suite of FMCG and retail analytics products engineered for commercial excellence.
          </p>
        </div>

        {/* Product Cards */}
        <div className="space-y-12">
          {/* BHScope — Hero Product */}
          <div className="max-w-2xl mx-auto">
            <a
              href="/products/BHScope"
              className="group flex flex-col rounded-2xl border-2 border-primary/40 bg-card hover:border-primary/70 transition-all overflow-hidden shadow-lg shadow-primary/5 hover:shadow-primary/10"
            >
              <div className="p-8 pb-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                    BHScope
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    SKU-Level Demand Planning & Point-of-Sale Analytics
                  </p>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed font-light">
                  An intelligent SaaS platform for demand planning that aligns store sales with warehouse supply. Predict customer demand with demand sensing, set profitable discounts with revenue growth management, prevent stockouts, and connect marketing teams with logistics in real-time.
                </p>
              </div>

              {/* Features */}
              <div className="px-8 pb-6 flex-1">
                <div className="border-t border-primary/30 pt-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                    Capabilities
                  </span>
                  <div className="mt-3 space-y-2">
                    {[
                      "Seasonal Sales Forecaster — 98% forecast accuracy",
                      "Promotion Demand Scanner",
                      "Warehouse Stock Protector — zero stockouts",
                      "Pricing & Margin Optimizer — +8% profit expansion",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5 shrink-0">▸</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mx-8 mb-6 p-4 rounded-xl border border-primary/30 bg-primary/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Avg Sales Lift", value: "+15%" },
                    { label: "Storage Cost Cut", value: "-30%" },
                    { label: "Margin Expansion", value: "+8%" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-lg font-bold font-mono text-primary">{s.value}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 py-4 border-t border-primary/30 bg-primary/5 flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-foreground group-hover:underline">
                  Open Dashboard
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* LeadForge — Lead Generation */}
          <div className="max-w-2xl mx-auto">
            <a
              href="/products/LeadForge"
              className="group flex flex-col rounded-2xl border-2 border-emerald-400/40 bg-card hover:border-emerald-400/70 transition-all overflow-hidden shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10"
            >
              <div className="p-8 pb-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Zap className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                    LeadForge
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Google Maps Lead Finder & AI Outreach
                  </p>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed font-light">
                  Find local business leads from Google Maps with phone, website, email and location, then write personalized outreach emails with AI to fill your pipeline fast.
                </p>
              </div>

              {/* Features */}
              <div className="px-8 pb-6 flex-1">
                <div className="border-t border-emerald-400/30 pt-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    Capabilities
                  </span>
                  <div className="mt-3 space-y-2">
                    {[
                      "Google Maps lead mining — phones, sites, emails",
                      "AI-personalized outreach message generation",
                      "Custom tone & value proposition controls",
                      "CSV export of qualified leads",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mx-8 mb-6 p-4 rounded-xl border border-emerald-400/30 bg-emerald-400/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Lead Accuracy", value: "98%" },
                    { label: "Message Personalization", value: "100%" },
                    { label: "Export Formats", value: "CSV" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-lg font-bold font-mono text-emerald-400">{s.value}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 py-4 border-t border-emerald-400/30 bg-emerald-400/5 flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-foreground group-hover:underline">
                  Open Lead Finder
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* OMNITENSORS Consulting — Secondary */}
          <div className="max-w-2xl mx-auto">
            <a
              href="/#services"
              className="group flex flex-col rounded-2xl border border-border/40 bg-card hover:border-indigo-400/40 transition-all overflow-hidden"
            >
              <div className="p-8 pb-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                    OMNITENSORS Consulting — Demand Planning & RGM
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Revenue Growth Management & Forecast Accuracy Consulting
                  </p>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed font-light">
                  Transform complex commercial and supply ecosystems into measurable growth through demand planning, revenue growth management, price elasticity modeling, and FMCG analytics.
                </p>
              </div>

              {/* Features */}
              <div className="px-8 pb-6 flex-1">
                <div className="border-t border-indigo-400/30 pt-4">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                    Capabilities
                  </span>
                  <div className="mt-3 space-y-2">
                    {[
                      "Revenue Growth Management",
                      "SKU-Level Demand Forecasting — 12,000+ SKUs",
                      "Inventory Optimization — 32% avg. cost reduction",
                      "Quick Commerce & Distribution Analytics",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mx-8 mb-6 p-4 rounded-xl border border-indigo-400/30 bg-indigo-400/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Engagements", value: "120+" },
                    { label: "Industries Served", value: "18" },
                    { label: "Continents", value: "4" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-lg font-bold font-mono text-indigo-400">{s.value}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 py-4 border-t border-indigo-400/30 bg-indigo-400/5 flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-foreground group-hover:underline">
                  Learn More
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* Nav Back */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
