import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LeadForgeDashboard() {
  return (
    <div className="h-[100dvh] bg-background text-foreground flex flex-col font-sans overflow-hidden w-full">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-2.5 border-b border-border/80 bg-background/95 backdrop-blur shrink-0">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground line-clamp-1">
          LeadForge · Lead Mining Tool
        </span>
      </div>
      <iframe
        src="https://mapgenie-pro.lovable.app/"
        className="flex-1 w-full h-full border-0"
        title="LeadForge — Google Maps Lead Finder & AI Outreach"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}