export default function SoftSolutionDashboard() {
  const targetUrl = "https://omnitensors-software-solutions-lb3vbd9gv.vercel.app";

  return (
    <div className="h-[100dvh] w-full bg-background overflow-hidden">
      <iframe
        src={targetUrl}
        className="w-full h-full border-0 block"
        title="OmniTensors Software Solutions"
        allow="clipboard-read; clipboard-write; fullscreen; camera; microphone; geolocation"
      />
    </div>
  );
}
