import { Link } from "react-router-dom";

export default function LeadForgeDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 lg:px-10 py-2 border-b border-border/55">
          <Link
            to="/products"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
          >
            ← Back to Products
          </Link>
          <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            LeadForge · FMCG Analytics · Revenue Growth · Lead Mining
          </span>
        </div>
        <iframe
          src="https://mapgenie-pro.lovable.app/"
          className="flex-1 w-full border-0"
          title="LeadForge — Google Maps Lead Finder & AI Outreach"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}