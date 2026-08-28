import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useReveal();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast.error("Please enter a valid work email.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending your request...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Thanks — we'll be in touch within one business day.", {
          id: toastId,
        });
        setEmail("");
      } else {
        toast.error(data.error || "Unable to send. Please try again.", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Network error. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--background)) 0, transparent 40%)" }} />
      <div ref={ref} className="reveal relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 grid grid-cols-12 gap-8 md:gap-6">
        <div className="col-span-12 md:col-span-7">
          <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-4 sm:mb-6">Begin</div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance font-bold">
            Ready to optimize<br />your demand & margins?
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
          <p className="opacity-75 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed max-w-md">
            Tell us where sales forecasting or pricing hurts. We'll respond with a 30-minute demand planning diagnostic on the house.
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 sm:gap-0 border-none sm:border-b sm:border-background/40 sm:focus-within:border-background transition-colors">
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              className="flex-1 bg-background/10 sm:bg-transparent border border-background/20 sm:border-none rounded-lg sm:rounded-none py-3.5 sm:py-4 px-4 sm:px-0 outline-none placeholder:opacity-50 text-base focus:border-background transition-colors disabled:opacity-50 text-background placeholder:text-background/60"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-xs uppercase tracking-[0.2em] py-3.5 sm:py-4 px-6 bg-background text-foreground sm:bg-transparent sm:text-background font-bold sm:hover:opacity-70 transition-all rounded-lg sm:rounded-none text-center disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <span>{isSubmitting ? "Sending..." : "Request brief"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
