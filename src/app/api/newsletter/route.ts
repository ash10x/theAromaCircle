import { NextResponse } from "next/server";
import { submitNewsletter } from "../../../../server/actions/submitNewsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await submitNewsletter(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Unable to subscribe." },
      { status: 500 },
    );
  }
}
