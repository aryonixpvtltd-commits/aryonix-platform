import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-secondary/35 bg-[#020614] shadow-glow">
        <Image
          src="/brand/aryonix-logo.png"
          alt="Aryonix logo"
          width={40}
          height={40}
          className="size-full object-cover"
          priority
        />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold tracking-[0.22em] text-text">
          ARYONIX
        </span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.28em] text-accent">
          DESIGN DEVELOP DEPLOY
        </span>
      </span>
    </Link>
  );
}
