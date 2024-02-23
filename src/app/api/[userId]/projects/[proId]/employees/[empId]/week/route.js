import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Time from "@/app/db/model/Time";

export async function GET(request, { params, searchParams }) {
  //GET TIMES DIRECTLY FROM TIMESHEET
  await connectDB();
  const { userId, proId, empId } = params;
  console.log("params week get", params);
  if (request.method === "GET") {
    console.log("reqmet", request.method);
    try {
      const timesheets = await Time.find({
        employeeId: empId,
        projectId: proId,
      });
      return NextResponse.json({ timesheets }, { status: 200 });
    } catch (error) {
      throw new Error("Get Timesheets error", error);
    }
  }
}
