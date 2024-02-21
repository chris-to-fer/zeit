import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Time from "@/app/db/model/Time";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const { userId, proId, empId } = params;

  const user = await User.findById(userId).populate("projects");
  return NextResponse.json({ user }, { status: 200 });
}
