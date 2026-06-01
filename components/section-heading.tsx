import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-secondary">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold text-text md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-accent md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
