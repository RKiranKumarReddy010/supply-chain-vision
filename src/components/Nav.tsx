import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "/services", desc: "Demand Planning & RGM Solutions" },
  { label: "Process", href: "/process", desc: "8-Week Enterprise Rollout" },
  { label: "Solutions", href: "/work", desc: "FMCG, Retail & Dark Stores" },
  { label: "Products", href: "/products", desc: "BHScope SaaS & LeadForge" },
  { label: "Team", href: "/team", desc: "Leadership & Data Science" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center group relative z-50 w-24 h-12"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 text-foreground drop-shadow-xl group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 200 150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Outer arc */}
                <path d="M 30 90 C 30 10, 170 10, 170 90 C 165 90, 160 30, 100 30 C 40 30, 35 90, 30 90 Z" />
                {/* Inner spike */}
                <path d="M 55 65 Q 80 40 90 55 L 100 100 L 110 55 Q 120 40 145 65 Q 125 45 100 40 Q 75 45 55 65 Z" />
                {/* Text O M N I */}
                <text x="102" y="115" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" fontSize="20" textAnchor="middle" letterSpacing="0.4em">OMNI</text>
                {/* Horizontal Line */}
                <rect x="30" y="122" width="140" height="2" />
                {/* Text TENSORS */}
                <text x="102" y="142" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="0.1em">TENSORS</text>
              </svg>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors relative py-1 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/contact"
              className="text-xs uppercase tracking-[0.18em] border border-border-strong px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors font-medium rounded-sm inline-flex items-center gap-1.5"
            >
              <span>Book a consult</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2 z-50">
            <a
              href="/contact"
              className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 bg-foreground text-background font-semibold rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Consult
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-foreground hover:bg-surface-2 border border-border focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-background/98 backdrop-blur-xl border-t border-border flex flex-col justify-between overflow-y-auto px-6 py-8 md:hidden"
          >
            <div className="space-y-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                Navigation
              </div>

              <div className="space-y-3">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface hover:bg-surface-2 transition-colors group"
                  >
                    <div>
                      <div className="font-display text-lg font-bold text-foreground group-hover:text-primary">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>

              {/* Quick Products Links on Mobile */}
              <div className="pt-4 border-t border-border">
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Live Product Tools</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="/products/BHScope"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-lg border border-border bg-card hover:border-foreground/40 text-left transition-colors"
                  >
                    <div className="font-bold text-xs text-foreground">BHScope</div>
                    <div className="text-[10px] text-muted-foreground font-mono">Demand SaaS →</div>
                  </a>
                  <a
                    href="/products/LeadForge"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-lg border border-border bg-card hover:border-emerald-500/40 text-left transition-colors"
                  >
                    <div className="font-bold text-xs text-foreground">LeadForge</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Lead Finder →</div>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-8 border-t border-border space-y-4">
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-6 rounded-lg bg-foreground text-background font-mono uppercase text-xs tracking-[0.2em] font-bold text-center flex items-center justify-center gap-2"
              >
                <span>Schedule 30-Min Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                OmniTensors · Demand Planning & RGM Solutions
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
