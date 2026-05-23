import { NextResponse } from "next/server";
import { submitOrder } from "../../../../server/actions/submitOrder";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await submitOrder(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "Unable to process order." },
      { status: 500 },
    );
  }
}
