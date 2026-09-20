import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";

const MEMBERS = [
  { name: "R Kiran Kumar Reddy", role: "Founder", photo: "/team/kiran-kumar-reddy.jpg", linkedin: "https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/" },
  { name: "Rahul Sahoo", role: "Founder", photo: "/team/rahul-sahoo.jpg", linkedin: "https://www.linkedin.com/in/rahul-sahoo-1581aa418/" },
  { name: "Vighneswara Manda", role: "CO-Founder", photo: "/team/vighnesh-manda.jpg", linkedin: "https://www.linkedin.com/in/vighneswara-manda/" },
  { name: "Ipsita Nayak", role: "Management Lead", photo: "/team/ipsita-nayak.jpg", linkedin: "https://www.linkedin.com/in/ipsita-nayak-398988244/" },
  { name: "Purnima Medapati", role: "Head of Sales", photo: "/team/purnima-medapetta.jpg", linkedin: "https://www.linkedin.com/in/purnima-medapati-483663332/" },
];

export default function TeamSection() {
  const ref = useReveal();
  return (
    <section id="team" className="bg-background">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Team</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance">
              The OmniTensors Analytics team<br />
              <span className="text-muted-foreground">behind the demand decisions.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {MEMBERS.map((m) => (
            <a key={m.name} href="/team" className="group relative overflow-hidden rounded-xl border border-border-strong hover:border-foreground transition-all">
              <img
                src={m.photo}
                alt={m.name}
                className="aspect-[3/4] w-full object-cover grayscale filter transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent flex justify-between items-end">
                <div className="text-left">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider">{m.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{m.role}</div>
                </div>
                {m.linkedin && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(m.linkedin, '_blank');
                    }}
                    className="text-[9px] font-mono uppercase tracking-wider bg-foreground text-background px-2 py-1 rounded-sm hover:opacity-80 transition-opacity z-10"
                  >
                    Connect
                  </button>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <a
            href="/team"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] border border-border-strong px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            Meet the full team <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}