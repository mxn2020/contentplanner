import { action } from "./_generated/server";
import { v } from "convex/values";
export const generatePlan = action({
    args: { niche: v.string(), platform: v.string(), frequency: v.string(), duration: v.string() },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are ContentPlanner, an expert content strategist. Generate a detailed content plan with a posting calendar, content pillars, and strategy. Output JSON:
{"strategy":"<2-3 sentence strategy>","pillars":[{"name":"","description":"","percentage":<% of content>}],"calendar":[{"week":<1-4>,"day":"Mon|Tue|...","contentType":"Reel|Post|Story|Carousel|Video|Thread","topic":"","caption":"<engaging caption>","hashtags":["tag1"]}],"tips":[""]}
Generate at least 12 calendar entries spread across the duration.` },
                    { role: "user", content: `Niche: ${args.niche}\nPlatform: ${args.platform}\nPosting frequency: ${args.frequency}\nDuration: ${args.duration}` },
                ], temperature: 0.7, max_tokens: 4000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
