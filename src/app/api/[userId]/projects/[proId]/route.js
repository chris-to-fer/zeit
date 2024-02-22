import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";

export async function GET(request, { params, searchParams }) {
  //GET EMPLOYEES OVER PROJECTS POPULATE
  await connectDB();
  const proId = params.proId;
  if (request.method === "GET") {
    const projects = await Project.findById(proId).populate("employees");
    return NextResponse.json({ projects }, { status: 200 });
  }
}

export async function POST(request, { params, searchParams }, response) {
  //EDIT PROJECT
  await connectDB();
  const { empId, userId, proId } = params;
  const data = await request.json();
  const method = data.method;
  // if (data.projectCode) {
  if (method === "EDITPROJECT") {
    try {
      const updatedProject = await Project.findByIdAndUpdate(proId, {
        $set: data,
      });
      console.log("Server side project edited");
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("Error editing project", error);
      return NextResponse.json({ status: 400 });
    }
  } else if (data.method === "DELETEPROJECT") {
    //DELETE PROJECT
    try {
      const projectToDelete = await Project.findByIdAndDelete(proId);
      await User.findByIdAndUpdate(userId, {
        $pull: { projects: proId },
      });
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("Error deleting project", error);
      return NextResponse.json({ status: 400 });
    }
  }
}
