import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { APP_NAME, APP_VERSION } from "@/lib/constants"

const footerLinks = [
  {
    title: "제품",
    links: [
      { title: "기능", href: "#features" },
      { title: "기술 스택", href: "#tech-stack" },
      { title: "대시보드", href: "/dashboard" },
    ],
  },
  {
    title: "계정",
    links: [
      { title: "로그인", href: "/login" },
      { title: "회원가입", href: "/register" },
    ],
  },
  {
    title: "리소스",
    links: [
      { title: "Next.js 문서", href: "https://nextjs.org/docs" },
      { title: "ShadcnUI", href: "https://ui.shadcn.com" },
      { title: "TailwindCSS", href: "https://tailwindcss.com" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              모던 웹 개발을 위한 프로덕션 레디 스타터킷
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME} v{APP_VERSION}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js & ShadcnUI
          </p>
        </div>
      </div>
    </footer>
  )
}
