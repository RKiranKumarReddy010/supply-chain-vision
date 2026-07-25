import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, TrendingUp, Warehouse, Zap } from "lucide-react";

const PRODUCTS = [
  {
    id: "bhscope",
    name: "BHScope",
    tagline: "Predictive Sales & Warehouse Inventory Planner",
    description:
      "An intelligent SaaS platform that aligns store sales with warehouse supply. Predict customer demand, set profitable discounts, prevent stockouts, and connect marketing teams with logistics in real-time.",
    href: "/products/BHScope",
    icon: BarChart3,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    features: [
      "Seasonal Sales Forecaster — 98% precision",
      "Promotion Demand Scanner",
      "Warehouse Stock Protector — zero stockouts",
      "Pricing & Margin Optimizer — +8% profit expansion",
    ],
    stats: [
      { label: "Avg Sales Lift", value: "+15%" },
      { label: "Storage Cost Cut", value: "-30%" },
      { label: "Margin Expansion", value: "+8%" },
    ],
  },
  {
    id: "consulting",
    name: "OMNITENSORS Consulting",
    tagline: "Revenue & Supply Chain Consulting",
    description:
      "Transform complex commercial and supply ecosystems into measurable growth through Revenue Optimization, Demand Intelligence, and Scalable Software Systems.",
    href: "/#services",
    icon: Building2,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    borderColor: "border-indigo-400/30",
    features: [
      "Revenue Growth Management",
      "Demand Forecasting — 12,000+ SKUs",
      "Supply Chain Analytics — 32% avg. cost reduction",
      "Custom Software Development",
    ],
    stats: [
      { label: "Engagements", value: "120+" },
      { label: "Industries Served", value: "18" },
      { label: "Continents", value: "4" },
    ],
  },
];

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
            Everything we build to grow your business
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            From AI-powered inventory optimization to strategic consulting — explore our full suite of products engineered for commercial excellence.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <a
                key={product.id}
                href={product.href}
                className="group flex flex-col rounded-2xl border border-border/55 bg-card hover:border-foreground/30 transition-all overflow-hidden"
              >
                <div className="p-8 pb-6 space-y-4">
                  <div className={`h-14 w-14 rounded-xl ${product.bgColor} ${product.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground font-mono mt-1">
                      {product.tagline}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="px-8 pb-6 flex-1">
                  <div className={`border-t ${product.borderColor} pt-4`}>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                      Capabilities
                    </span>
                    <div className="mt-3 space-y-2">
                      {product.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className={`${product.color} mt-0.5 shrink-0`}>▸</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className={`mx-8 mb-6 p-4 rounded-xl border ${product.borderColor} ${product.bgColor}/5`}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {product.stats.map((s) => (
                      <div key={s.label}>
                        <div className={`text-lg font-bold font-mono ${product.color}`}>{s.value}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className={`px-8 py-4 border-t ${product.borderColor} ${product.bgColor}/5 flex items-center justify-between mt-auto`}>
                  <span className="text-sm font-semibold text-foreground group-hover:underline">
                    {product.id === "bhscope" ? "Open Dashboard" : "Learn More"}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
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
