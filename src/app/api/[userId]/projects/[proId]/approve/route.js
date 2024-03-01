import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Time from "@/app/db/model/Time";
import { revalidatePath } from "next/cache";
import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import Employee from "@/app/db/model/Employee";

export async function GET(request, { params, searchParams }) {
  //GET not approved times of project

  const HOSTNAME = process.env.HOSTNAME_URL;
  const { proId, userId, empId } = params;
  // revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/approve`);
  await connectDB();

  const notApproved = await Time.find({
    approved: false,
    projectId: proId,
  })
    .populate("employeeId")
    .populate("projectId");

  return NextResponse.json({ notApproved }, { status: 200 });
}
