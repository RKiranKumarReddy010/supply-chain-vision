import { Link } from "react-router-dom";

export default function BHScopeDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 lg:px-10 py-4 border-b border-border/55">
          <Link
            to="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
          >
            ← Back to Products
          </Link>
          <a
            href="https://omni-tensors-dashboard-as5u.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
          >
            Open in new tab ↗
          </a>
        </div>
        <iframe
          src="https://omni-tensors-dashboard-as5u.vercel.app/"
          className="flex-1 w-full border-0"
          title="BHScope Dashboard"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
