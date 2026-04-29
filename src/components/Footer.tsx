export default function Footer() {
  const cols = [
    { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
    { h: "Services", l: ["Analytics", "Network design", "Forecasting", "S&OP"] },
    { h: "Resources", l: ["Insights", "Case studies", "Whitepapers", "Glossary"] },
    { h: "Legal", l: ["Privacy", "Terms", "Cookies", "Security"] },
  ];
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 bg-foreground rounded-full" />
              <span className="font-display text-sm tracking-[0.18em] uppercase">
                Axis <span className="text-muted-foreground">// </span>Analytics
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Decision intelligence for the world's most complex supply chains.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="col-span-6 md:col-span-2">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5">{c.h}</div>
              <ul className="space-y-3 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="hover:text-foreground text-foreground/80 transition-colors">{x}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <div>© {new Date().getFullYear()} Axis Analytics Ltd.</div>
          <div>London · New York · Singapore</div>
        </div>
      </div>
    </footer>
  );
}
