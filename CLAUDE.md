# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 프로젝트 개요

Next.js 스타터킷 — 인증, 대시보드, 랜딩 페이지를 포함한 풀스택 템플릿. 실제 백엔드 없이 UI/UX 구조와 패턴을 시연하는 데모 구현체.

## 주요 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

shadcn/ui 컴포넌트 추가:
```bash
npx shadcn@latest add <component-name>
```

## 아키텍처

### 라우팅 구조

- `app/(auth)/` — 인증 전용 레이아웃 그룹 (`/login`, `/register`)
- `app/(dashboard)/` — 대시보드 레이아웃 그룹 (`/dashboard`, `/dashboard/settings`)
- `app/api/` — Route Handler (현재 `/api/health` 헬스체크만 존재)
- `app/page.tsx` — 퍼블릭 랜딩 페이지

괄호 그룹 `(auth)`, `(dashboard)`는 URL에 영향 없이 레이아웃을 분리.

### 컴포넌트 계층

```
components/
  ui/          # shadcn/ui 원시 컴포넌트 (직접 수정 지양)
  dashboard/   # 대시보드 전용 (사이드바, 헤더, 브레드크럼, 통계 카드)
  layout/      # 퍼블릭 사이트 헤더/푸터
  shared/      # 재사용 컴포넌트 (Logo, PageHeader, ThemeToggle, EmptyState)
  providers/   # 루트 컨텍스트 래퍼 (Query, Theme)
```

### 핵심 파일

- `lib/constants.ts` — APP_NAME, 네비게이션 배열, 플레이스홀더 데이터
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `lib/validations/` — Zod 스키마 (auth.ts, settings.ts)
- `types/index.ts` — NavItem, User, StatCard 등 공유 타입
- `hooks/use-mobile.ts` — 768px 모바일 브레이크포인트 감지

## 주요 기술 패턴

### 폼 처리
React Hook Form + Zod를 함께 사용. Zod 스키마에서 타입 추론:
```typescript
type LoginFormValues = z.infer<typeof loginSchema>
```

### 테마 시스템
- `next-themes` ThemeProvider로 라이트/다크/시스템 지원
- CSS 변수 기반 색상 (`oklch` 색 공간), `globals.css`에 정의
- `components/shared/theme-toggle.tsx`로 토글

### 클라이언트 vs 서버 컴포넌트
- 기본: 서버 컴포넌트
- 인터랙티브한 경우만 `"use client"` 선언 (폼, 사이드바, 헤더, Provider)

### 데이터 페칭
TanStack Query 설정: staleTime 60초, retry 1회 (`components/providers/query-provider.tsx`)

## 현재 구현 상태

인증, API, DB 연동은 **데모 스텁** 상태 (실제 동작 없음). 실 서비스 적용 시 아래를 구현해야 함:
- 인증 로직 (NextAuth, Lucia 등)
- API 라우트에 실제 DB 연동
- `lib/constants.ts`의 플레이스홀더 데이터 교체
