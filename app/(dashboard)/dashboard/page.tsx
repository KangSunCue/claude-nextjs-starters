import { Metadata } from "next"
import { StatCard } from "@/components/dashboard/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { DASHBOARD_STATS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "대시보드",
}

const recentActivity = [
  { id: 1, user: "홍길동", action: "새 계정 생성", time: "방금 전", status: "완료" },
  { id: 2, user: "김철수", action: "결제 완료", time: "5분 전", status: "완료" },
  { id: 3, user: "이영희", action: "프로필 수정", time: "12분 전", status: "완료" },
  { id: 4, user: "박민준", action: "파일 업로드", time: "1시간 전", status: "처리 중" },
  { id: 5, user: "최수연", action: "구독 취소", time: "2시간 전", status: "완료" },
]

const SKELETON_WIDTHS = [72, 55, 80, 45, 65, 58, 70]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="서비스 현황을 한눈에 확인하세요"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>최근 사용자 활동 내역입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {item.user[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.user}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.action}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge
                      variant={item.status === "완료" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Skeleton (placeholder for charts) */}
        <Card>
          <CardHeader>
            <CardTitle>주간 트렌드</CardTitle>
            <CardDescription>차트 컴포넌트를 연결하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton
                    className="h-4 rounded-full"
                    style={{ width: `${SKELETON_WIDTHS[i % SKELETON_WIDTHS.length]}%` }}
                  />
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
