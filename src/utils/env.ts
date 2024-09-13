import { z } from "zod";

const envSchema = z.object({
  API_TOKEN: z.string(),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
