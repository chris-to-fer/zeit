import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Time from "@/app/db/model/Time";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const { userId, proId, empId } = params;
  const timesheets = await Time.find({ employeeId: empId, projectId: proId });
  return NextResponse.json({ timesheets }, { status: 200 });
}
