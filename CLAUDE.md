# CLAUDE.md

@AGENTS.md

## 프로젝트 개요

Next.js 스타터킷 — 인증, 대시보드, 랜딩 페이지를 포함한 풀스택 템플릿. 실제 백엔드 없이 UI/UX 구조와 패턴을 시연하는 데모 구현체.

## 주요 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

shadcn/ui 컴포넌트 추가:
```bash
npx shadcn@latest add <component-name>
```

## 기술 스택

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| Next.js | 16.2.4 | 풀스택 프레임워크 |
| React | 19.2.4 | UI 라이브러리 |
| TypeScript | ^5 | 타입 시스템 |
| TailwindCSS | ^4 | CSS 유틸리티 (CSS-first) |
| shadcn/ui | ^4.4.0 | UI 컴포넌트 (radix-nova 스타일) |
| TanStack Query | ^5 | 서버 상태 관리 |
| React Hook Form | ^7 | 폼 관리 |
| Zod | ^4 | 스키마 유효성 검사 |
| next-themes | ^0.4 | 다크 모드 |
| sonner | ^2 | 토스트 알림 |
| date-fns | ^4 | 날짜 유틸리티 |
| lucide-react | ^1 | 아이콘 |

## ⚠️ 주요 주의사항

### Next.js 16
`AGENTS.md`에 명시: **이 버전은 기존 Next.js와 다르다.** API, 컨벤션, 파일 구조가 학습 데이터와 다를 수 있다. 코드 작성 전 반드시 `node_modules/next/dist/docs/`의 가이드를 참조할 것.

### TailwindCSS v4 (CSS-first)
- `tailwind.config.js` **없음** — 설정은 `app/globals.css`에서 `@theme inline {}` 블록으로 관리
- `@import "tailwindcss"` 방식 사용 (PostCSS 기반)
- `tw-animate-css`로 애니메이션 처리
- 임의 값(arbitrary value) 문법 일부 변경됨

### Zod v4
- 버전 ^4.3.6 사용 — v3와 일부 API 상이
- 에러 메시지는 한국어로 작성 (프로젝트 컨벤션)

## 아키텍처

### 라우팅 구조

- `app/(auth)/` — 인증 전용 레이아웃 그룹 (`/login`, `/register`)
- `app/(dashboard)/` — 대시보드 레이아웃 그룹 (`/dashboard`, `/dashboard/settings`)
- `app/api/health/` — 헬스체크 (`{ status, timestamp, version }` 반환)
- `app/page.tsx` — 퍼블릭 랜딩 페이지
- `app/not-found.tsx` — 전역 404 페이지

괄호 그룹 `(auth)`, `(dashboard)`는 URL에 영향 없이 레이아웃을 분리.

### 컴포넌트 계층

```
components/
  ui/          # shadcn/ui 원시 컴포넌트 (직접 수정 지양)
  dashboard/   # 대시보드 전용 (app-sidebar, app-header, breadcrumbs, nav-user, stat-card)
  layout/      # 퍼블릭 사이트 헤더/푸터 (site-header, site-footer)
  shared/      # 재사용 컴포넌트 (logo, page-header, theme-toggle, empty-state)
  providers/   # 루트 컨텍스트 래퍼
```

### Providers 구성

`components/providers/index.tsx`에서 다음 순서로 래핑:
```
ThemeProvider → QueryProvider → TooltipProvider → {children} + <Toaster />
```
- `Toaster`: sonner, `richColors`, `position="bottom-right"`
- `ThemeProvider`: `attribute="class"`, `defaultTheme="system"`

### 핵심 파일

- `lib/constants.ts` — `APP_NAME`, `APP_DESCRIPTION`, `APP_VERSION`, `SITE_URL`, `MARKETING_NAV`, `DASHBOARD_NAV`, `PLACEHOLDER_USER`, `FEATURES`, `TECH_STACK`, `DASHBOARD_STATS`
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `lib/validations/auth.ts` — `loginSchema`, `registerSchema` + 추론 타입
- `lib/validations/settings.ts` — `profileSchema`, `appearanceSchema` + 추론 타입
- `types/index.ts` — `NavItem`, `NavGroup`, `User`, `StatCard`, `BreadcrumbItem`, `Feature`, `TechBadge`
- `hooks/use-mobile.ts` — 768px 모바일 브레이크포인트 감지
- `app/globals.css` — Tailwind v4 테마 변수 + shadcn CSS 변수 정의

### 폰트

Geist Sans (`--font-geist-sans`) + Geist Mono (`--font-geist-mono`) — Next.js Google Fonts 최적화 적용.

## 주요 기술 패턴

### 폼 처리
React Hook Form + Zod를 함께 사용. Zod 스키마에서 타입 추론:
```typescript
type LoginFormValues = z.infer<typeof loginSchema>
```

### 테마 시스템
- `next-themes` ThemeProvider로 라이트/다크/시스템 지원
- CSS 변수 기반 색상, `globals.css`의 `@theme inline {}` 블록에 정의
- `components/shared/theme-toggle.tsx`로 토글

### 클라이언트 vs 서버 컴포넌트
- 기본: 서버 컴포넌트
- 인터랙티브한 경우만 `"use client"` 선언 (폼, 사이드바, 헤더, Provider)

### 데이터 페칭
TanStack Query 설정: `staleTime` 60초, `retry` 1회 (`components/providers/query-provider.tsx`)

## Claude Code 설정

### 에이전트 (`.claude/agents/`)
- `code-reviewer` — 코드 구현 완료 후 자동 트리거. TypeScript 타입 안전성, 아키텍처 패턴, 성능, 보안 관점에서 한국어 리뷰 제공

### 커맨드 (`.claude/commands/`)
- `/deploy-check` — 배포 전 체크리스트 자동 실행 (lint, build, 환경변수, 보안 기초)
- `/git:commit <메시지>` — 변경사항 분석 후 커밋 생성

## 현재 구현 상태

인증, API, DB 연동은 **데모 스텁** 상태 (실제 동작 없음). 실 서비스 적용 시 아래를 구현해야 함:
- 인증 로직 (NextAuth, Lucia 등)
- API 라우트에 실제 DB 연동
- `lib/constants.ts`의 플레이스홀더 데이터 교체
