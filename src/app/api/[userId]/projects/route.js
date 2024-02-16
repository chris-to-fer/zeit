import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";

export async function GET(request) {
  await connectDB();
  console.log("ServerTest");
  const projects = await Project.find();
  return NextResponse.json({ projects }, { status: 200 });
}
