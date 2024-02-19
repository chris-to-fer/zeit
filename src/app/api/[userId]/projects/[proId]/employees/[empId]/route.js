import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";
import Time from "@/app/db/model/Time";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const { userId, proId, empId } = params;
  console.log("empid", empId);
  const employee = await Employee.findById(empId).populate("times");

  return NextResponse.json({ employee }, { status: 200 });
}
