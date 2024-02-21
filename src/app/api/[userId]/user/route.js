import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Project from "@/app/db/model/Project";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const { userId, proId, empId } = params;

  const user = await User.findById(userId).populate("projects");
  return NextResponse.json({ user }, { status: 200 });
}
