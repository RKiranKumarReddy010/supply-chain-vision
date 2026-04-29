import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="inline-block w-2 h-2 bg-foreground rounded-full" />
          <span className="font-display text-sm tracking-[0.18em] uppercase text-foreground">
            Axis <span className="text-muted-foreground">// </span>Analytics
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {["Services", "Process", "Work", "Insights"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.18em] border border-border-strong px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Book a consult →
        </a>
      </nav>
    </header>
  );
}
