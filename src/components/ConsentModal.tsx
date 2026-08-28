import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Cookie, FileCheck2, Fingerprint, ScrollText, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import SignaturePad from "./SignaturePad";

const STORAGE_KEY = "omnitensors-legal-consent";
const OPEN_EVENT = "omnitensors:open-consent";

const consentAreas = [
  { icon: ScrollText, label: "Terms of Use" },
  { icon: ShieldCheck, label: "Conditions" },
  { icon: Cookie, label: "Cookies & Privacy" },
];

export default function ConsentModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "form">("intro");
  const [checks, setChecks] = useState([false, false, false]);
  const [hasInk, setHasInk] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const [justSigned, setJustSigned] = useState(false);
  const [alreadyConsented, setAlreadyConsented] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const t = setTimeout(() => {
      let consented = false;
      try {
        consented = !!localStorage.getItem(STORAGE_KEY);
      } catch {
        // ignore storage errors
      }
      if (!consented) setOpen(true);
    }, 700);

    const onOpen = () => {
      let consented = false;
      try {
        consented = !!localStorage.getItem(STORAGE_KEY);
      } catch {
        // ignore storage errors
      }
      setAlreadyConsented(consented);
      if (consented) {
        setStep("intro");
        setJustSigned(false);
      }
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const allChecked = checks.every(Boolean);

  const toggleCheck = (i: number) => {
    setChecks((prev) => prev.map((c, idx) => (idx === i ? !c : c)));
  };

  const sign = () => {
    if (!allChecked || !hasInk) return;
    const iso = new Date().toISOString();
    setSignedAt(new Date(iso).toLocaleString());
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ signedAt: iso, areas: consentAreas.map((a) => a.label) }));
    } catch {
      // ignore storage errors
    }
    toast.success("Signature recorded — terms, conditions & cookies accepted.");
    setJustSigned(true);
    setAlreadyConsented(true);
    setTimeout(() => setOpen(false), 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Blur backdrop */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={alreadyConsented ? close : undefined} />

          <motion.div
            key={step + (justSigned ? "-signed" : "")}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-surface shadow-[var(--shadow-glow)] max-h-[92dvh] overflow-y-auto"
          >
            {alreadyConsented && (
              <button
                type="button"
                onClick={close}
                aria-label="Close consent"
                className="absolute top-3.5 right-3.5 z-10 h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {justSigned ? (
              <div className="p-6 sm:p-10 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 sm:mb-5"
                >
                  <Check className="h-7 w-7 sm:h-8 sm:w-8" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Consent Signed</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-mono">
                  Recorded · {signedAt}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Terms, conditions & cookies are now accepted on this device.
                </p>
              </div>
            ) : step === "intro" ? (
              /* ---------- Blur intro panel ---------- */
              <div className="p-5 sm:p-8 md:p-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] uppercase tracking-wider font-semibold mb-4 sm:mb-5">
                  <FileCheck2 className="h-3.5 w-3.5" />
                  <span>Before you continue</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-[1.15]">
                  Accept terms,<br />conditions & cookies
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                  We use cookies and process data to deliver analytics securely. To continue, review and accept our
                  terms below. Your consent is recorded with a digital signature — stored locally on this device.
                </p>

                <ul className="mt-5 sm:mt-6 space-y-2">
                  {consentAreas.map((a) => (
                    <li
                      key={a.label}
                      className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3.5 py-2.5"
                    >
                      <a.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">{a.label}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="mt-6 sm:mt-8 w-full text-center text-xs uppercase tracking-[0.2em] py-3.5 sm:py-4 px-6 bg-foreground text-background hover:bg-foreground/85 transition-colors font-semibold"
                >
                  Accept &amp; Review Consent →
                </button>
                <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider">
                  Terms of Use · Conditions · Cookie Policy
                </p>
              </div>
            ) : (
              /* ---------- Inline consent form ---------- */
              <div className="p-5 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-wider font-semibold mb-2">
                      <FileCheck2 className="h-3 w-3" />
                      <span>Consent form</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Sign to confirm consent</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("intro")}
                    className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded"
                  >
                    ← Back
                  </button>
                </div>

                {/* Agreement checks */}
                <div className="mb-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
                    I have read and agree to:
                  </div>
                  <div className="space-y-2">
                    {consentAreas.map((a, i) => (
                      <button
                        key={a.label}
                        type="button"
                        onClick={() => toggleCheck(i)}
                        className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 sm:py-3 text-left transition-colors min-h-[44px] ${
                          checks[i]
                            ? "border-primary/60 bg-primary/5"
                            : "border-border bg-background/60 hover:border-primary/40"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 rounded-sm border flex items-center justify-center transition-colors ${
                            checks[i] ? "bg-foreground border-foreground" : "border-border-strong"
                          }`}
                        >
                          {checks[i] && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-background" />}
                        </span>
                        <a.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                        <span className="text-xs sm:text-sm font-medium flex-1">{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Signature */}
                <div className="mb-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Digital signature
                  </div>
                  <SignaturePad onInkChange={setHasInk} />
                </div>

                <button
                  type="button"
                  onClick={sign}
                  disabled={!allChecked || !hasInk}
                  className="w-full text-center text-xs uppercase tracking-[0.2em] py-3.5 sm:py-4 px-6 bg-foreground text-background hover:bg-foreground/85 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                >
                  <Fingerprint className="h-4 w-4" />
                  Sign &amp; Accept
                </button>
                <p className="mt-3 text-center text-[10px] sm:text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider">
                  All boxes must be checked and signed to proceed
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}