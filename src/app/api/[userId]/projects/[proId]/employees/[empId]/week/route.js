import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Time from "@/app/db/model/Time";
import { revalidatePath } from "next/cache";

export async function GET(request, { params }) {
  //GET TIMES DIRECTLY FROM TIMESHEET
  await connectDB();
  const { userId, proId, empId } = params;

  if (request.method === "GET") {
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

export async function POST(request, { params }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  await connectDB();
  const data = await request.json();
  // const method = await data.method;
  const { userId, empId, proId, weekId } = params;
  const { approvedTimes, method } = data;
  const approvedObjects = approvedTimes.map((e) => ({
    _id: e._id,
    approved: e.approved,
  }));

  if (method === "APPROVETIMESHEETS") {
    try {
      await approvedObjects.map(async (e) => {
        const approvedTimesheet = await Time.findByIdAndUpdate(
          {
            _id: e._id,
          },

          { $set: { approved: e.approved } },
          { multi: true }
        );
      });
      // revalidatePath(
      //   `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
      // );
      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  }
}
