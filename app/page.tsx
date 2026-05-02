import Link from "next/link"
import { ArrowRight, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { FEATURES, TECH_STACK, APP_NAME, APP_DESCRIPTION } from "@/lib/constants"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <Badge variant="outline" className="mb-6 gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Next.js 16 + React 19
          </Badge>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            모던 웹 개발을 위한{" "}
            <span className="text-muted-foreground">프로덕션 레디</span>{" "}
            스타터킷
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {APP_DESCRIPTION}. 검증된 라이브러리와 최신 기술 스택으로
            아이디어를 빠르게 제품으로 만들어보세요.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                대시보드 보기
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">시작하기</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">핵심 기능</h2>
              <p className="mt-3 text-muted-foreground">
                프로덕션에 필요한 모든 것이 준비되어 있습니다
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">기술 스택</h2>
              <p className="mt-3 text-muted-foreground">
                검증된 라이브러리만 엄선했습니다
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {TECH_STACK.map((tech) => (
                <Badge
                  key={tech.name}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm"
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 text-muted-foreground">
              {APP_NAME}으로 개발 시간을 절반으로 줄이세요.
              복잡한 초기 설정 없이 비즈니스 로직에 집중할 수 있습니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  무료로 시작하기
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com" target="_blank" rel="noreferrer">
                  <GitFork className="mr-2 size-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
