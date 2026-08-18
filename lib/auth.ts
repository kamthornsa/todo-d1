import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "@/db";
import { schema } from "@/db/schema";

export function getAuth() {
  const { env } = getCloudflareContext();

  return betterAuth({
    appName: "Simple Todo",
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
    advanced: {
      database: { joins: true },
      defaultCookieAttributes: {
        httpOnly: true,
        secure: env.BETTER_AUTH_URL.startsWith("https://"),
        sameSite: "lax",
      },
    },
  });
}
