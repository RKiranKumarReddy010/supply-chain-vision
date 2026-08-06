import SocialLinks from "./SocialLinks";

export default function Footer() {
  const cols = [
    { h: "Capabilities", l: ["Demand Planning", "Sales Forecasting", "SKU-Level Forecasting", "Inventory Optimization"] },
    { h: "RGM", l: ["Revenue Growth Management", "Trade Spend Optimization", "Price Elasticity Modeling", "Net Revenue Management"] },
    { h: "Industries", l: ["FMCG Analytics", "Retail Business Intelligence", "Mid-Retail Analytics", "Quick Commerce"] },
    { h: "Company", l: ["About", "Team", "Careers", "Contact"] },
  ];
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display text-sm tracking-[0.18em] uppercase">
                OMNITENSORS
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Demand planning, sales forecasting & revenue growth management analytics for FMCG and retail. See demand clearly. Price precisely. Execute intelligently.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="col-span-12 sm:col-span-6 md:col-span-2">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5">{c.h}</div>
              <ul className="space-y-3 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a
                      href={x === "Team" ? "/team" : "#"}
                      className="hover:text-foreground text-foreground/80 transition-colors"
                    >
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <div>© {new Date().getFullYear()} OMNITENSORS Inc.</div>
          <div className="flex items-center gap-6">
            <div>India, Odisha</div>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
