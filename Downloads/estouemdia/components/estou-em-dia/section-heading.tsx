import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Variant = "light" | "dark" | "blue"

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: "left" | "center"
  variant?: Variant
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "w-full max-w-3xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "mx-auto w-full text-center md:mx-0 md:text-left",
        className,
      )}
    >
      <p
        className={cn(
          "mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs",
          variant === "light" && "text-[#2563EB]",
          variant === "dark" && "text-[#4ADE80]",
          variant === "blue" && "text-white/75",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance text-3xl font-bold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl md:text-[2.65rem] md:leading-[1.1]",
          variant === "dark" && "text-white",
          variant === "blue" && "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed md:text-lg",
            align === "center" && "mx-auto",
            align === "left" && "mx-auto md:mx-0",
            variant === "light" && "text-slate-600",
            variant === "dark" && "text-slate-400",
            variant === "blue" && "text-white/85",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
