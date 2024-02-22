import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";
import Login from "@/app/components/Login";

export async function POST(request, { params, searchParams }, response) {
  await connectDB();
  const data = await request.json();
  const method = await data.method;
  const { userId, proId, empId } = params;
  console.log("params server", params);
  console.log("method ", method);

  if (method === "CREATEPROJECT") {
    console.log("trigger method:", method);
    try {
      const newProject = await Project.create(data);
      await User.findByIdAndUpdate(
        userId,
        { $push: { projects: newProject._id } },
        { new: true }
      );
      console.log("Server side project created");
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("Error posting new project", error);
      return NextResponse.json({ status: 400 });
    }
  } else if (method === "DELETEEMPLOYEE") {
    console.log("trigger method:", method);
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
    console.log("trigger method:", method);
    try {
      const newEmployee = await Employee.create(data);
      await Project.findByIdAndUpdate(
        proId,
        { $push: { employees: newEmployee._id } },
        { new: true }
      );

      console.log("Server side Employee created");

      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("Error creating new employee", error);
      return NextResponse.json({ status: 400 });
    }
  }
}

/*
Session Api routes
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return NextResponse.json({
    id: 1,
  });
}

*/
