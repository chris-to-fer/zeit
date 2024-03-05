import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";
import Time from "@/app/db/model/Time";
import { revalidatePath } from "next/cache";

export async function GET(request, { params, searchParams }) {
  ///GET TIMES Of EMPLOYEES
  await connectDB();

  const { userId, proId, empId } = params;

  if (request.method === "GET") {
    const employee = await Employee.findById(empId)
      .populate("project")
      .populate("times");

    // revalidatePath(request.url);

    return NextResponse.json({ employee }, { status: 200 });
  }
}

export async function POST(request, { params, searchParams }) {
  await connectDB();
  const data = await request.json();
  const method = await data.method;
  const { userId, empId, proId, timeId } = params;
  // let proId = params.proId;

  if (method === "DELETEEMPLOYEE") {
    try {
      const employeeToDelete = await Employee.findByIdAndDelete(empId);
      await Project.findByIdAndUpdate(proId, {
        $pull: { employees: empId },
      });
      const deletedCount = await Time.deleteMany({
        employeeId: empId,
        projectId: proId,
      });

      return NextResponse.json({ deletedCount }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  } else if (method === "CREATEEMPLOYEE") {
    // const proIdi = data.project;

    try {
      const newEmployee = await Employee.create(data);
      await Project.findByIdAndUpdate(
        proId,
        { $push: { employees: newEmployee._id } },
        { new: true }
      );

      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  } else if (method === "EDITEMPLOYEE") {
    // proId = data.project;

    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(empId, data);

      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  } else if (data.check === true) {
    const existingDocument = await Time.findOne({
      date: new Date(data.date),
      projectId: proId,
      employeeId: empId,
    });
    if (existingDocument) {
      return NextResponse.json({ message: "DATUM" }, { status: 400 });
    }
    return NextResponse.json({ status: 200 });
  } else if (method === "CREATETIMESHEET") {
    if (new Date(data.date) > new Date()) {
      return NextResponse.json({ message: "FUTURE" }, { status: 400 });
    }
    try {
      const newTimesheet = await Time.create(data);
      await Employee.findByIdAndUpdate(
        empId,
        { $push: { times: newTimesheet._id } },
        { new: true }
      );

      return NextResponse.json({ status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  } else if (method === "EDITTIMESHEET") {
    //

    try {
      await Time.findByIdAndUpdate(data.timeId, data);

      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  } else if (method === "DELETETIMESHEET") {
    try {
      const timesheetToDelete = await Time.findByIdAndDelete(data.timeId);
      await Employee.findByIdAndUpdate(empId, {
        $pull: { times: data.timeId },
      });
      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  }
}

/*for later auth
const session = await getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        )
    };
    */
