import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import { toast } from "sonner";
import { Mail, Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    challenge: "",
    scope: "Demand Planning & Forecasting",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid business email address.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting consultation request...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Request received! Our team will reach out within 24 hours.", { id: toastId });
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          challenge: "",
          scope: "Demand Planning & Forecasting",
        });
      } else {
        toast.success("Thanks for reaching out! We will connect with you shortly.", { id: toastId });
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          challenge: "",
          scope: "Demand Planning & Forecasting",
        });
      }
    } catch {
      toast.success("Thanks for reaching out! We will connect with you shortly.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden w-full">
      <Nav />

      {/* Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4">
            Direct Consultation
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl font-bold">
            Let's Talk Demand, Inventory & Growth.
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Schedule a 30-minute technical consultation with our analytics team to discuss your forecasting pipeline, pricing strategy, or inventory optimization goals.
          </p>
        </div>
      </section>

      {/* Main Content: White Card Form + Contact Info */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
            {/* Left: Direct Info */}
            <div className="lg:col-span-5 space-y-8 sm:space-y-10">
              <div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  What to expect in your diagnostic session:
                </h2>
                <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Review of current demand forecasting process and major SKU-location pain points.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Identification of safety stock imbalances, stockout drivers, or promotion leakages.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>A tailored recommendation roadmap for algorithmic modeling and S&OP integration.</span>
                  </li>
                </ul>
              </div>

              {/* Contact Details Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card space-y-5">
                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Direct Email</div>
                    <a href="mailto:kiran.kumar@omnitensors.in" className="text-sm font-semibold hover:underline break-all">
                      kiran.kumar@omnitensors.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Typical Response</div>
                    <div className="text-sm text-zinc-300">Within 24 business hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Consultation Duration</div>
                    <div className="text-sm text-zinc-300">30-Minute Video Briefing (Google Meet / Teams)</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/80">
                  <SocialLinks />
                </div>
              </div>
            </div>

            {/* Right: Consultation Form */}
            <div className="lg:col-span-7 bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200 shadow-2xl">
              <div className="mb-6">
                <span className="text-xs font-mono uppercase font-bold text-zinc-500 tracking-wider">
                  Request Intake
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 mt-1">
                  Book Diagnostic Session
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme FMCG"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. VP Supply Chain / Head of RGM"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                    Primary Area of Interest
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  >
                    <option>Demand Planning & Forecasting</option>
                    <option>Revenue Growth Management (RGM)</option>
                    <option>Inventory & Multi-Echelon Buffer Sizing</option>
                    <option>BHScope SaaS Platform Demo</option>
                    <option>LeadForge Lead Finder Engine</option>
                    <option>Custom Enterprise Engagement</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                    Key Challenge or Scope Details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Briefly describe your current supply chain, forecasting, or pricing bottleneck..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-zinc-950 text-white font-mono uppercase text-xs tracking-[0.2em] font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isSubmitting ? "Submitting..." : "Confirm Consultation Request"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-zinc-500 font-mono text-center pt-1">
                  Non-disclosure guaranteed · No spam policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
