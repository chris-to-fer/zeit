import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";

export async function GET(request) {
  await connectDB();
  console.log("Project api ");
  const projects = await Project.find().populate("employees");
  return NextResponse.json({ projects }, { status: 200 });
}
