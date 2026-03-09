import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  contentPlans: defineTable({
    niche: v.string(), platform: v.string(), frequency: v.string(), duration: v.string(),
    strategy: v.string(),
    calendar: v.array(v.object({ week: v.number(), day: v.string(), contentType: v.string(), topic: v.string(), caption: v.string(), hashtags: v.array(v.string()) })),
    pillars: v.array(v.object({ name: v.string(), description: v.string(), percentage: v.number() })),
    tips: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
