import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("server", params.userId);
  return NextResponse.json({ msg: "Hello World" });
}
