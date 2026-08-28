import SocialLinks from "./SocialLinks";

export default function Footer() {
  const openConsent = () => window.dispatchEvent(new CustomEvent("omnitensors:open-consent"));

  const cols = [
    {
      h: "Capabilities",
      links: [
        { label: "Demand Planning", href: "/services#service-01" },
        { label: "Sales Forecasting", href: "/services#service-01" },
        { label: "Inventory Solutions", href: "/services#service-03" },
        { label: "Retail Analytics", href: "/services#service-04" },
      ],
    },
    {
      h: "RGM & Strategy",
      links: [
        { label: "Revenue Growth Management", href: "/services#service-02" },
        { label: "Trade Spend Optimization", href: "/services#service-02" },
        { label: "Price Elasticity", href: "/services#service-02" },
        { label: "Pack Architecture", href: "/services#service-02" },
      ],
    },
    {
      h: "Solutions",
      links: [
        { label: "FMCG & Packaged Goods", href: "/work" },
        { label: "Modern Retail & Stores", href: "/work" },
        { label: "Quick Commerce", href: "/work" },
        { label: "Industrial & Manufacturing", href: "/work" },
      ],
    },
    {
      h: "Company",
      links: [
        { label: "Services", href: "/services" },
        { label: "Process & Rollout", href: "/process" },
        { label: "Products Suite", href: "/products" },
        { label: "Team", href: "/team" },
        { label: "Contact & Consult", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8 md:gap-10">
          {/* Brand Col */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-sm tracking-[0.18em] uppercase font-bold text-foreground">
                OMNITENSORS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              Demand planning, sales forecasting & revenue growth management analytics for FMCG and retail. See demand clearly. Price precisely. Execute intelligently.
            </p>
          </div>

          {/* Links Cols */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {cols.map((c) => (
              <div key={c.h} className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {c.h}
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {c.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-foreground text-muted-foreground transition-colors block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <div>© {new Date().getFullYear()} OMNITENSORS Inc.</div>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <button onClick={openConsent} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
              Terms & Consent
            </button>
            <span className="text-border">·</span>
            <div>India, Odisha</div>
            <span className="text-border">·</span>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
