import { useReveal } from "@/hooks/useReveal";

const STATS = [
  { v: "32%", l: "Avg. logistics cost reduction" },
  { v: "120+", l: "Engagements delivered" },
  { v: "18", l: "Industries served" },
  { v: "4", l: "Continents, one playbook" },
];

export default function Stats() {
  const ref = useReveal();
  return (
    <section className="border-t border-b border-border bg-background">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {STATS.map((s) => (
          <div key={s.v} className="bg-background p-8">
            <div className="font-display text-4xl md:text-5xl">{s.v}</div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
