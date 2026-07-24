import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";

/** AI search / retrieval + training crawlers to keep explicitly allowed for AEO/GEO. */
const AI_CRAWLERS = [
	// OpenAI — ChatGPT search, browsing, and training
	"GPTBot",
	"ChatGPT-User",
	"OAI-SearchBot",
	// Anthropic — Claude search, browsing, and training
	"ClaudeBot",
	"Claude-User",
	"Claude-SearchBot",
	"anthropic-ai",
	// Google — Gemini / AI Overviews training token (Googlebot remains under *)
	"Google-Extended",
	// Perplexity
	"PerplexityBot",
	"Perplexity-User",
	// xAI — Grok (when identified; some fetches use browser UAs)
	"xAI-SearchBot",
	"GrokBot",
	"Grok-DeepSearch",
	"xAI-Grok",
	// Other common AI / answer-engine crawlers
	"Applebot-Extended",
	"Amazonbot",
	"CCBot",
	"meta-externalagent",
	"FacebookBot",
	"Bytespider",
	"cohere-ai",
	"Diffbot",
	"AI2Bot",
	// Microsoft / Brave (Brave Search uses Bing index)
	"bingbot",
	"BingPreview",
] as const;

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getBaseUrl();

	return {
		rules: [
			{
				userAgent: "*",
				allow: ["/", "/llms.txt", "/llms-full.txt"],
				disallow: ["/api/"],
			},
			{
				userAgent: [...AI_CRAWLERS],
				allow: ["/", "/llms.txt", "/llms-full.txt"],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
