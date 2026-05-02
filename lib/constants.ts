import {
  LayoutDashboard,
  Settings,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  Palette,
  Code2,
  Moon,
  Router,
} from "lucide-react"
import type { NavGroup, StatCard, Feature, TechBadge, User } from "@/types"

export const APP_NAME = "NextStarter"
export const APP_DESCRIPTION = "모던 웹 개발을 위한 프로덕션 레디 Next.js 스타터킷"
export const APP_VERSION = "0.1.0"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const MARKETING_NAV: { title: string; href: string }[] = [
  { title: "기능", href: "#features" },
  { title: "기술 스택", href: "#tech-stack" },
  { title: "대시보드", href: "/dashboard" },
]

export const DASHBOARD_NAV: NavGroup[] = [
  {
    items: [
      { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
      { title: "설정", href: "/dashboard/settings", icon: Settings },
    ],
  },
]

export const PLACEHOLDER_USER: User = {
  name: "홍길동",
  email: "user@example.com",
  avatarUrl: undefined,
  role: "관리자",
}

export const FEATURES: Feature[] = [
  {
    title: "App Router",
    description: "Next.js 15+ App Router 기반으로 RSC, 스트리밍, 레이아웃을 완벽하게 지원합니다.",
    icon: Router,
  },
  {
    title: "TypeScript",
    description: "엄격한 타입 체크로 런타임 에러를 줄이고 개발 생산성을 높입니다.",
    icon: Code2,
  },
  {
    title: "TailwindCSS v4",
    description: "CSS-first 설정 방식의 최신 Tailwind로 빠르고 일관된 스타일링이 가능합니다.",
    icon: Palette,
  },
  {
    title: "ShadcnUI",
    description: "접근성을 고려한 Radix UI 기반 컴포넌트로 즉시 사용 가능한 UI를 제공합니다.",
    icon: Zap,
  },
  {
    title: "다크 모드",
    description: "Light / Dark / System 세 가지 테마를 next-themes로 zero-flicker 구현합니다.",
    icon: Moon,
  },
  {
    title: "폼 유효성 검사",
    description: "react-hook-form + zod로 타입 안전한 폼 관리와 실시간 유효성 검사를 제공합니다.",
    icon: Shield,
  },
]

export const TECH_STACK: TechBadge[] = [
  { name: "Next.js 16", href: "https://nextjs.org" },
  { name: "React 19", href: "https://react.dev" },
  { name: "TypeScript", href: "https://www.typescriptlang.org" },
  { name: "TailwindCSS v4", href: "https://tailwindcss.com" },
  { name: "ShadcnUI", href: "https://ui.shadcn.com" },
  { name: "lucide-react", href: "https://lucide.dev" },
  { name: "react-hook-form", href: "https://react-hook-form.com" },
  { name: "zod", href: "https://zod.dev" },
  { name: "TanStack Query", href: "https://tanstack.com/query" },
  { name: "sonner", href: "https://sonner.emilkowal.ski" },
  { name: "next-themes", href: "https://github.com/pacocoursey/next-themes" },
  { name: "date-fns", href: "https://date-fns.org" },
]

export const DASHBOARD_STATS: StatCard[] = [
  {
    title: "총 사용자",
    value: "12,345",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "지난 달 대비",
  },
  {
    title: "월 매출",
    value: "₩4,820,000",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
    description: "지난 달 대비",
  },
  {
    title: "총 주문",
    value: "2,891",
    change: "-3.1%",
    trend: "down",
    icon: ShoppingCart,
    description: "지난 달 대비",
  },
  {
    title: "활성 세션",
    value: "573",
    change: "+19%",
    trend: "up",
    icon: Activity,
    description: "현재 실시간",
  },
]
