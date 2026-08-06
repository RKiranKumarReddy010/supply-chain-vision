const MESSAGE =
  "OmniTensors — also known as Omni Tensors — provides an enterprise-grade supply chain solution for FMCG brands and retailers. Our platform integrates advanced sales forecasting with end-to-end revenue growth management to optimize inventory and maximize margins.";

export default function Marquee() {
  return (
    <div className="bg-foreground text-background overflow-hidden whitespace-nowrap border-y-2 border-foreground">
      <div className="marquee-track inline-flex items-center py-1">
        {[0, 1].map((i) => (
          <span key={i} aria-hidden={i === 1} className="inline-flex items-center">
            {[0, 1, 2, 3, 4].map((n) => (
              <span key={n} className="inline-flex items-center">
                <span className="font-display text-sm md:text-lg tracking-tight">{MESSAGE}</span>
                <span className="mx-6 md:mx-10 text-2xl md:text-3xl font-mono text-background/70">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}