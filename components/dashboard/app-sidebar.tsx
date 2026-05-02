"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { NavUser } from "./nav-user"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { DASHBOARD_NAV, PLACEHOLDER_USER } from "@/lib/constants"

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-14" : "w-60"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        {collapsed ? (
          <Logo showText={false} className="mx-auto" />
        ) : (
          <Logo />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {DASHBOARD_NAV.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.title && !collapsed && (
              <p className="mb-1 px-2 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
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
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70"
                  )}
                >
                  {Icon && <Icon className="size-4 shrink-0" />}
                  <span
                    className={cn(
                      "truncate transition-all duration-200",
                      collapsed ? "w-0 overflow-hidden opacity-0" : "opacity-100"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <NavUser user={PLACEHOLDER_USER} collapsed={collapsed} />
        <Separator className="bg-sidebar-border" />
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn("w-full text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent", collapsed ? "justify-center" : "justify-end")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
          <span className="sr-only">{collapsed ? "사이드바 펼치기" : "사이드바 접기"}</span>
        </Button>
      </div>
    </aside>
  )
}
