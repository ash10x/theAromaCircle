import { NextResponse } from "next/server";
import { submitContact } from "../../../../server/actions/submitContact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await submitContact(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to submit contact request." },
      { status: 500 },
    );
  }
}
