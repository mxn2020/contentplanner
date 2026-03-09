import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const savePlan = mutation({
  args: {
    niche: v.string(), platform: v.string(), frequency: v.string(), duration: v.string(), strategy: v.string(),
    calendar: v.array(v.object({ week: v.number(), day: v.string(), contentType: v.string(), topic: v.string(), caption: v.string(), hashtags: v.array(v.string()) })),
    pillars: v.array(v.object({ name: v.string(), description: v.string(), percentage: v.number() })), tips: v.array(v.string())
  },
  handler: async (ctx, args) => await ctx.db.insert("contentPlans", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("contentPlans").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
