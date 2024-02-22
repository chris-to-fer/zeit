import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";
import Time from "@/app/db/model/Time";

export async function GET(request, { params, searchParams }) {
  ///GET TIMES Of EMPLOYEES
  await connectDB();
  const { userId, proId, empId } = params;
  console.log("RM ", request.method);
  if (request.method === "GET") {
    const employee = await Employee.findById(empId).populate("times");

    return NextResponse.json({ employee }, { status: 200 });
  }
}

export async function POST(request, { params, searchParams }, response) {
  await connectDB();
  const data = await request.json();
  const method = await data.method;
  const { userId, empId, proId } = params;
  // let proId = params.proId;

  console.log("params server", params);
  console.log("method ", method);

  if (method === "DELETEEMPLOYEE") {
    try {
      const employeeToDelete = await Employee.findByIdAndDelete(empId);
      await Project.findByIdAndUpdate(proId, {
        $pull: { employees: empId },
      });
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("Error deleting employee", error);
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
      console.log("Error creating new employee", error);
      return NextResponse.json({ status: 400 });
    }
  } else if (method === "EDITEMPLOYEE") {
    // proId = data.project;

    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(empId, data);

      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("Error editing employee", error);
      return NextResponse.json({ status: 400 });
    }
  }
}
