"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Breadcrumbs } from "./breadcrumbs"
import { NavUser } from "./nav-user"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Logo } from "@/components/shared/logo"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DASHBOARD_NAV, PLACEHOLDER_USER } from "@/lib/constants"

function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-4">
      <Logo />
      <Separator />
      <nav className="space-y-1">
        {DASHBOARD_NAV.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.title && (
              <p className="mb-1 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {Icon && <Icon className="size-4 shrink-0" />}
                  {item.title}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <Separator />
      <NavUser user={PLACEHOLDER_USER} />
    </div>
  )
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <SheetHeader className="sr-only">
            <SheetTitle>네비게이션</SheetTitle>
          </SheetHeader>
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Breadcrumbs */}
      <div className="flex-1 min-w-0">
        <Breadcrumbs />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  )
}
