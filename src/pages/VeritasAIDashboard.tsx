import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function VeritasAIDashboard() {
  const location = useLocation();

  // Forward query params (like ?order_id=...) to truth-seeker-suite iframe so payment verification works seamlessly
  const iframeTarget = location.search
    ? `https://truth-seeker-suite.vercel.app/playground${location.search}`
    : "https://truth-seeker-suite.vercel.app/";

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
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground line-clamp-1">
            Veritas AI - Statistical AI Detection & Rectification Suite
          </span>
          <a
            href={location.search ? `https://truth-seeker-suite.vercel.app/playground${location.search}` : "https://truth-seeker-suite.vercel.app/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40"
            title="Open in standalone window"
          >
            <span className="hidden sm:inline">Open Standalone</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      <iframe
        src={iframeTarget}
        className="flex-1 w-full h-full border-0"
        title="Veritas AI Suite - Statistical AI Detection & Rectification"
        allow="clipboard-read; clipboard-write; payment; camera; microphone"
      />
    </div>
  );
}
