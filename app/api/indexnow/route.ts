import { NextRequest, NextResponse } from "next/server";
import { submitIndexNow } from "@/app/lib/indexNow";

/**
 * POST /api/indexnow
 * Optional header: x-indexnow-secret = INDEXNOW_SUBMIT_SECRET
 * Body (optional): { "urls": ["https://www.devsignpro.com/en"] }
 */
export async function POST(request: NextRequest) {
	const requiredSecret = process.env.INDEXNOW_SUBMIT_SECRET;
	if (!requiredSecret) {
		return NextResponse.json(
			{ error: "Set INDEXNOW_SUBMIT_SECRET to enable IndexNow submissions." },
			{ status: 503 },
		);
	}

	const provided = request.headers.get("x-indexnow-secret");
	if (provided !== requiredSecret) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	let urls: string[] | undefined;
	try {
		const body = await request.json();
		if (Array.isArray(body?.urls)) {
			urls = body.urls.filter((u: unknown) => typeof u === "string");
		}
	} catch {
		// empty body is fine — submit default URL set
	}

	const result = await submitIndexNow(urls);
	return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
