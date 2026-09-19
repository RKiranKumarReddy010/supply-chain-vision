import { useState, useEffect } from "react";
import CardNav, { CardNavItem } from "@/components/ui/CardNav";

const NAV_ITEMS: CardNavItem[] = [
  {
    label: "Solutions",
    bgColor: "hsl(var(--card))",
    textColor: "hsl(var(--card-foreground))",
    links: [
      { label: "Services", href: "/services", ariaLabel: "Demand & Supply Services" },
      { label: "Process", href: "/process", ariaLabel: "Our Process" },
      { label: "Solutions", href: "/work", ariaLabel: "Industry Solutions" },
    ]
  },
  {
    label: "Products",
    bgColor: "hsl(var(--muted))",
    textColor: "hsl(var(--foreground))",
    links: [
      { label: "BHScope", href: "/products/BHScope", ariaLabel: "BHScope Product" },
      { label: "Veritas AI", href: "/products/VeritasAI", ariaLabel: "Veritas AI Product" },
      { label: "LeadForge", href: "/products/LeadForge", ariaLabel: "LeadForge Product" },
    ]
  },
  {
    label: "Company",
    bgColor: "hsl(var(--surface-2))",
    textColor: "hsl(var(--foreground))",
    links: [
      { label: "Team", href: "/team", ariaLabel: "Our Team" },
      { label: "Contact Us", href: "/contact", ariaLabel: "Contact Us" },
    ]
  }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const OmniLogo = (
    <div className="w-[72px] -mt-2 text-foreground drop-shadow-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center">
      <svg viewBox="0 0 200 150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <path d="M 30 90 C 30 10, 170 10, 170 90 C 165 90, 160 30, 100 30 C 40 30, 35 90, 30 90 Z" />
        <path d="M 55 65 Q 80 40 90 55 L 100 100 L 110 55 Q 120 40 145 65 Q 125 45 100 40 Q 75 45 55 65 Z" />
        <text x="102" y="115" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" fontSize="20" textAnchor="middle" letterSpacing="0.4em">OMNI</text>
        <rect x="30" y="122" width="140" height="2" />
        <text x="102" y="142" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="0.1em">TENSORS</text>
      </svg>
    </div>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-[100] pointer-events-none">
      <div className="w-full h-full pointer-events-auto">
        <CardNav
          logo={OmniLogo}
          items={NAV_ITEMS}
          baseColor={scrolled ? "hsl(var(--background) / 0.7)" : "transparent"}
          menuColor="hsl(var(--foreground))"
          buttonBgColor="hsl(var(--foreground))"
          buttonTextColor="hsl(var(--background))"
          ctaText="Book Consultant"
          ctaHref="/contact"
          ease="power3.out"
          className={scrolled ? "border-border" : "border-transparent"}
        />
      </div>
    </header>
  );
}
