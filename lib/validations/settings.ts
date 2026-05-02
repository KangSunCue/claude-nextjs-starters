import { z } from "zod"

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .min(2, "이름은 2자 이상이어야 합니다"),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  bio: z
    .string()
    .max(160, "소개는 160자 이하이어야 합니다")
    .optional(),
})

export const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
export type AppearanceFormValues = z.infer<typeof appearanceSchema>
