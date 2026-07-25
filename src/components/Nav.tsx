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
      <nav className="mx-auto max-w-7xl px-4 lg:px-10 h-14 md:h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center group relative z-50 w-16 h-10">
          <div className="absolute top-1/2 left-2 -translate-y-1/2 w-20 text-foreground drop-shadow-xl group-hover:scale-105 transition-transform duration-500">
            <svg viewBox="0 0 200 150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Outer arc */}
              <path d="M 30 90 C 30 10, 170 10, 170 90 C 165 90, 160 30, 100 30 C 40 30, 35 90, 30 90 Z" />
              {/* Inner spike */}
              <path d="M 55 65 Q 80 40 90 55 L 100 100 L 110 55 Q 120 40 145 65 Q 125 45 100 40 Q 75 45 55 65 Z" />
              {/* Text O M N I */}
              <text x="102" y="115" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="900" font-size="20" text-anchor="middle" letter-spacing="0.4em">OMNI</text>
              {/* Horizontal Line */}
              <rect x="30" y="122" width="140" height="2" />
              {/* Text TENSORS */}
              <text x="102" y="142" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="900" font-size="24" text-anchor="middle" letter-spacing="0.1em">TENSORS</text>
            </svg>
          </div>
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
          <li>
            <a
              href="/products"
              className="hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full font-semibold text-foreground/90"
            >
              Products
            </a>
          </li>
        </ul>
        <a
          href="#contact"
          className="text-[10px] md:text-xs uppercase tracking-[0.18em] border border-border-strong px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Book a consult →
        </a>
      </nav>
    </header>
  );
}
