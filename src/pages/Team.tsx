import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Linkedin, Users } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  roleTag: string;
  photo: string;
  bio: string;
  focus: string[];
  email: string;
};

const team: TeamMember[] = [
  {
    id: "kiran-kumar",
    name: "R Kiran Kumar Reddy",
    role: "Founder",
    roleTag: "CEO",
    photo: "/team/kiran-kumar-reddy.jpg",
    bio: "Data Scientist & AI Developer with professional experience in supply chain forecasting and FMCG analytics. Proficient in engineering scalable Python pipelines, generative AI modeling, and advanced anomaly detection. Proven track record of translating complex business requirements into high-impact operational insights and robust production-grade machine learning workflows leveraging advanced statistical forecasting models and state-of-the-art transformer architectures for mid-market and enterprise retail brands.",
    focus: ["Revenue Growth Strategy", "AI Engineer", "Data Scientist"],
    email: "kiran.kumar@omnitensors.in",
  },
  {
    id: "rahul",
    name: "Rahul Sahoo",
    role: "Founder",
    roleTag: "CEO",
    photo: "/team/rahul-sahoo.jpg",
    bio: "",
    focus: ["Demand Forecasting", "Probabilistic Modelling", "S&OP Integration"],
    email: "rahul.sahoo@omnitensors.in",
  },
  {
    id: "vignesh",
    name: "Vighneshwara Manda",
    role: "CO-Founder",
    roleTag: "Manager",
    photo: "/team/vighnesh-manda.jpg",
    bio: "",
    focus: ["Network Design", "Inventory Optimization", "ERP & WMS Integration"],
    email: "arjun@omnitensors.in",
  },
  {
    id: "Ipsita",
    name: "Ipsita Nayak",
    role: "Management Lead",
    roleTag: "Project Manager",
    photo: "/team/ipsita-nayak.jpg",
    bio: "",
    focus: ["Trade Spend Optimisation", "Promotion Effectiveness", "Elasticity Modelling"],
    email: "ananya@omnitensors.in",
  },
  {
    id: "purnima",
    name: "Medapetta Purnima",
    role: "Head of Sales",
    roleTag: "Sales & Ops Lead",
    photo: "/team/purnima-medapetta.jpg",
    bio: "",
    focus: ["Data Platforms & Pipelines", "Decision Dashboards", "AI/ML Deployment"],
    email: "rohan@omnitensors.in",
  },
];

export default function Team() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 pt-28 pb-20 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-foreground/20 bg-foreground/5 text-foreground text-xs uppercase tracking-wider font-semibold mb-4">
            <Users className="h-4 w-4" />
            <span>Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
            About <span className="bg-foreground text-background px-3">OmniTensors</span> Team
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Black-and-white by design. The people who turn data, models, and strategy into your growth. Tap a portrait to read more.
          </p>
        </div>

        {/* Team Photo Grid — grayscale black & white */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {team.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelected(m);
                document.getElementById("member-profile")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                selected?.id === m.id
                  ? "border-foreground ring-1 ring-foreground"
                  : "border-border-strong hover:border-foreground"
              }`}
            >
              <img
                src={m.photo}
                alt={m.name}
                className="aspect-[3/4] w-full object-cover grayscale filter transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent text-left">
                <div className="text-xs font-semibold text-foreground uppercase tracking-wider">{m.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  {m.role}
                </div>
              </div>
              <span className="absolute top-3 right-3 h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          ))}
        </div>

        {/* Member Profile — photo left, about right */}
        {selected && (
          <div
            id="member-profile"
            className="mt-16 scroll-mt-24 rounded-2xl border border-foreground/20 bg-card overflow-hidden shadow-glow"
          >
            <div className="grid md:grid-cols-12">
              {/* Picture — Left aligned */}
              <div className="md:col-span-4 relative w-full h-full min-h-[320px] md:min-h-[520px] border-r border-border">
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                />
              </div>

              {/* About — Right aligned */}
              <div className="md:col-span-8 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground border border-foreground/30 px-2.5 py-1 bg-foreground/5">
                      {selected.roleTag}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      {selected.role}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                    {selected.name}
                  </h2>
                  <p className="mt-5 text-muted-foreground text-base leading-relaxed font-light">
                    {selected.bio}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="border-t border-border pt-5">
                    <span className="text-xs font-mono text-foreground uppercase tracking-wider font-semibold">
                      Focus Areas
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selected.focus.map((f) => (
                        <span
                          key={f}
                          className="text-xs px-3 py-1.5 rounded-full border border-border-strong text-foreground/80"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-xs text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider transition-colors"
                    >
                      {selected.email} →
                    </a>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-xs uppercase tracking-wider border border-border-strong px-3 py-2 hover:bg-foreground hover:text-background transition-colors"
                    >
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav Back */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}