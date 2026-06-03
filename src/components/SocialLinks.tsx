export default function SocialLinks() {
  const links = [
    { href: 'https://www.linkedin.com/company/omnitensorpvtltd/', label: 'LinkedIn', svg: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 24h4V7h-4v17zM8.5 7h3.82v2.34h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.12V24h-4v-8.1c0-1.93-.03-4.41-2.69-4.41-2.7 0-3.11 2.1-3.11 4.27V24h-4V7z"/></svg>
    ) },
    { href: 'https://www.instagram.com/omnitensors?igsh=cmFyaGYwYzk5bnU=', label: 'Instagram', svg: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm6.6-.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/></svg>
    ) },
    { href: 'https://x.com/Omnitensors', label: 'X', svg: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.13 12.13 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.32 5.72 4.22 4.22 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 3.99 2.97A8.58 8.58 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.6 8.6 0 0 0 22.46 6z"/></svg>
    ) },
    { href: 'https://www.facebook.com/share/1CQLGujhx4/', label: 'Facebook', svg: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.2h-1.12c-1.1 0-1.45.69-1.45 1.4V12h2.48l-.4 2.9h-2.08v7A10 10 0 0 0 22 12z"/></svg>
    ) },
  ];

  return (
    <div className="flex items-center gap-4">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          {l.svg}
        </a>
      ))}
    </div>
  );
}
