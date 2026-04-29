import { useReveal } from "@/hooks/useReveal";

export default function Testimonial() {
  const ref = useReveal();
  return (
    <section className="bg-background border-t border-border">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6 lg:px-10 py-32 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-10">
          Client · Tier-1 retailer
        </div>
        <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] text-balance">
          “Axis didn't hand us a deck. They handed us a working decision system —
          and a network that <span className="text-muted-foreground">runs eleven points leaner.</span>”
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="w-10 h-px bg-border-strong" />
          <span>SVP Operations</span>
          <span className="w-10 h-px bg-border-strong" />
        </div>
      </div>
    </section>
  );
}
