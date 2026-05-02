import type { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  badge?: string
  disabled?: boolean
}

export interface NavGroup {
  title?: string
  items: NavItem[]
}

export interface User {
  name: string
  email: string
  avatarUrl?: string
  role?: string
}

export interface StatCard {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
  description?: string
}

export interface BreadcrumbItem {
  title: string
  href?: string
}

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

export interface TechBadge {
  name: string
  href: string
}
