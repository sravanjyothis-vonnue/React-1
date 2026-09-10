export function MarqueeRow({ children }: any) {
  return (
    <div className="marquee-track">
      <div className="marquee-content" id="marquee-content">
        {children}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
