import { logoFor, monogramFor } from "@/lib/logos";

export function CompanyLogo({
  name,
  className = "",
  size = 28,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const logo = logoFor(name);
  if (!logo) {
    const initials = monogramFor(name);
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-[#e8e8ed] text-[10px] font-bold tracking-tight text-[#6e6e73] ${className}`}
        style={{ width: size, height: size }}
        aria-label={name}
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={logo.file}
      alt={logo.alt}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${logo.invert ? "brightness-0" : ""} ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}

export function LogoStrip({ companies }: { companies: string[] }) {
  const row = [...companies, ...companies];
  const duration = Math.max(30, companies.length * 2.4);
  return (
    <div className="marquee-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className="animate-marquee motion-reduce:animate-none flex w-max items-center gap-16 pr-16 will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      >
        {row.map((c, i) => {
          const logo = logoFor(c);
          return (
            <span
              key={`${c}-${i}`}
              className="flex shrink-0 items-center"
              title={logo?.alt ?? c}
            >
              {logo ? (
                <img
                  src={logo.file}
                  alt={logo.alt}
                  draggable={false}
                  className={`h-6 w-auto max-w-32 object-contain opacity-50 grayscale-[0.35] transition-all duration-500 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0 md:h-8 ${
                    logo.invert ? "brightness-0" : ""
                  }`}
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold tracking-tight text-[#86868b]">
                  {c}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
