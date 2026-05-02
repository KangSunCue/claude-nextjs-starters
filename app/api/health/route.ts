import { APP_VERSION } from "@/lib/constants"

export async function GET() {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
  })
}
