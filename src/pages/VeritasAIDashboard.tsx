import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function VeritasAIDashboard() {
  return (
    <div className="h-[100dvh] bg-[#080d14] text-slate-100 flex flex-col font-sans overflow-hidden w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 lg:px-10 py-2.5 border-b border-cyan-950/80 bg-[#06090e]/95 backdrop-blur shrink-0">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-mono uppercase tracking-wider py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>

        {/* Center / Status */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] sm:text-xs font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold">VERITAS AI</span>
            <span className="text-cyan-600 hidden sm:inline">|</span>
            <span className="text-cyan-400/80 hidden sm:inline">v2.4 Live Suite</span>
          </span>
          <span className="hidden md:inline-block text-[11px] font-mono text-slate-400">
            99.4% Accuracy · &lt; 450ms Latency · Sentence Heatmap
          </span>
        </div>

        {/* External Link */}
        <div className="flex items-center gap-2">
          <a
            href="https://truth-seeker-suite.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-colors"
          >
            <span>Open truth-seeker-suite.vercel.app</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embed Frame */}
      <iframe
        src="https://truth-seeker-suite.vercel.app/"
        className="flex-1 w-full h-full border-0 bg-[#080d14]"
        title="Veritas AI Suite — Next-Generation Statistical AI Detection & Rectification"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}
