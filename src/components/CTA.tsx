import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { toast } from "sonner";

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
    } catch (error) {
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
      <div ref={ref} className="reveal relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-32 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-6 md:mb-8">Begin</div>
          <h2 className="font-display text-3xl md:text-6xl lg:text-7xl leading-[1.02] text-balance">
            Ready to optimize<br />your network?
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
          <p className="opacity-70 mb-8 max-w-md">
            Tell us where it hurts. We'll respond with a 30-minute diagnostic on the house.
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 border-none sm:border-b sm:border-background/40 sm:focus-within:border-background transition-colors">
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              className="flex-1 bg-transparent border-b border-background/40 sm:border-none py-4 px-2 sm:px-0 outline-none placeholder:opacity-50 text-base focus:border-background transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-xs uppercase tracking-[0.2em] py-4 px-6 bg-background/10 hover:bg-background/20 sm:bg-transparent sm:hover:bg-transparent sm:hover:opacity-70 transition-all self-stretch sm:self-auto text-center disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Request brief →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
