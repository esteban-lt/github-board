interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <svg width="24" height="24" viewBox="0 0 200 200" role="img" aria-label="Pulsed logo" style={{ display: "block" }}>
        <circle cx="100" cy="100" r="100" fill="#6366f1" />
        <mask id="pulsed-mask">
          <circle cx="100" cy="100" r="100" fill="white" />
        </mask>
        <g mask="url(#pulsed-mask)">
          <circle cx="30" cy="170" r="28"  fill="none" stroke="white" strokeWidth="10" />
          <circle cx="30" cy="170" r="52"  fill="none" stroke="white" strokeWidth="10" />
          <circle cx="30" cy="170" r="76"  fill="none" stroke="white" strokeWidth="10" />
          <circle cx="30" cy="170" r="100" fill="none" stroke="white" strokeWidth="10" />
          <circle cx="30" cy="170" r="124" fill="none" stroke="white" strokeWidth="10" />
        </g>
      </svg>

      {showText && <span className="font-semibold text-lg">Pulsed</span>}
    </div>
  );
};
