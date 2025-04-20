import { NextResponse } from "next/server";
import csrf from "csrf";

const tokens = new csrf();

export async function GET() {
    const csrfToken = tokens.create(process.env.CSRF_SECRET!);
    return NextResponse.json({ csrfToken });
}
