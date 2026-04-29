import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { toast } from "sonner";

export default function CTA() {
  const ref = useReveal();
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid work email.");
      return;
    }
    toast.success("Thanks — we'll be in touch within one business day.");
    setEmail("");
  };

  return (
    <section id="contact" className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--background)) 0, transparent 40%)" }} />
      <div ref={ref} className="reveal relative mx-auto max-w-7xl px-6 lg:px-10 py-32 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-8">Begin</div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance">
            Ready to optimize<br />your network?
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
          <p className="opacity-70 mb-8 max-w-md">
            Tell us where it hurts. We'll respond with a 30-minute diagnostic on the house.
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row border-b border-background/40 focus-within:border-background transition-colors">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              className="flex-1 bg-transparent py-4 outline-none placeholder:opacity-50 text-base"
            />
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.2em] py-4 px-6 hover:opacity-70 transition-opacity self-start sm:self-auto"
            >
              Request brief →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
