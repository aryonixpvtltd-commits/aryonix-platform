import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  href,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/70",
    variant === "primary" &&
      "bg-primary text-white shadow-glow hover:bg-secondary",
    variant === "secondary" &&
      "border border-line bg-white/[0.06] text-text hover:border-secondary/60 hover:bg-white/[0.1]",
    variant === "ghost" && "text-accent hover:bg-white/[0.06] hover:text-text",
    className
  );

  if (href) {
    const isExternal = href.startsWith("http");

    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        {props.children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
