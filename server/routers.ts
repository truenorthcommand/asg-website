import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { blogRouter } from "./routers/blog";

// TrueNorthOS intake endpoint
const TRUENORTHOS_ENDPOINT = "https://asgtruenorthos.cloud/api/external/intake/job";
const TRUENORTHOS_TOKEN = "TrueNorth_Secure_Handshake_2026";

const intakeSchema = z.object({
  customerName: z.string().min(1).max(200),
  contactEmail: z.string().email().max(320),
  contactPhone: z.string().min(1).max(50),
  address: z.string().min(1).max(500),
  postcode: z.string().min(1).max(20),
  description: z.string().min(1).max(5000),
  urgency: z.enum(["high", "normal"]).default("normal"),
  emergency_type: z.string().max(100).optional(),
});

const intakeRouter = router({
  submit: publicProcedure
    .input(intakeSchema)
    .mutation(async ({ input }) => {
      // Build the payload for TrueNorthOS
      const payload = {
        customerName: input.customerName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        address: `${input.address}, ${input.postcode}`,
        postcode: input.postcode,
        description: input.description,
        urgency: input.urgency,
        ...(input.emergency_type ? { emergency_type: input.emergency_type } : {}),
      };

      let jobNo: string | null = null;
      let integrationError: string | null = null;

      try {
        const response = await fetch(TRUENORTHOS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TRUENORTHOS_TOKEN}`,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(15000),
        });

        if (response.ok) {
          const data = await response.json() as { jobNo?: string; success?: boolean };
          jobNo = data.jobNo ?? null;
        } else {
          const errText = await response.text();
          integrationError = `TrueNorthOS returned ${response.status}: ${errText}`;
          console.error("[intake] TrueNorthOS error:", integrationError);
        }
      } catch (err) {
        integrationError = err instanceof Error ? err.message : "Unknown error";
        console.error("[intake] TrueNorthOS fetch failed:", integrationError);
      }

      // Notify owner regardless of TrueNorthOS outcome
      const urgencyLabel = input.urgency === "high" ? "🚨 URGENT" : "📋 Normal";
      const notifTitle = `${urgencyLabel} — New Enquiry from ${input.customerName}`;
      const notifContent = [
        `**Name:** ${input.customerName}`,
        `**Email:** ${input.contactEmail}`,
        `**Phone:** ${input.contactPhone}`,
        `**Address:** ${input.address}, ${input.postcode}`,
        `**Urgency:** ${input.urgency}`,
        input.emergency_type ? `**Emergency Type:** ${input.emergency_type}` : null,
        `**Description:** ${input.description}`,
        jobNo ? `**TrueNorthOS Job Ref:** ${jobNo}` : null,
        integrationError ? `**⚠️ Integration Error:** ${integrationError}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await notifyOwner({ title: notifTitle, content: notifContent }).catch((e) =>
        console.error("[intake] notifyOwner failed:", e)
      );

      return {
        success: true,
        jobNo,
        integrationError,
      };
    }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  intake: intakeRouter,
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
