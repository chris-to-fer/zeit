import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const method = request.method;
  console.log("get method:", method);
  const proId = params.proId;

  const projects = await Project.findById(proId).populate("employees");

  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(request, { params, searchParams }, response) {
  await connectDB();
  const userId = params.userId;
  const proId = params.proId;
  const data = await request.json();
  const method = await request.body.message;

  if (data.name) {
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
  } else if (data.message === "DELETE") {
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
