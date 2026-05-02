import Link from "next/link"
import { cn } from "@/lib/utils"
import { APP_NAME } from "@/lib/constants"

interface LogoProps {
  className?: string
  href?: string
  showText?: boolean
}

export function Logo({ className, href = "/", showText = true }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-2 font-semibold", className)}>
      <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      {showText && (
        <span className="text-foreground">{APP_NAME}</span>
      )}
    </Link>
  )
}
