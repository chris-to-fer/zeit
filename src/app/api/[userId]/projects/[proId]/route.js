import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const proId = params.proId;
  console.log("prams ", params);
  console.log(proId, "proid");

  const projects = await Project.findById(proId).populate("employees");

  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(request, { params, searchParams }, response) {
  const userId = params.userId;
  const proId = params.proId;
  try {
    await connectDB();
    const editedForm = await request.json();
    const updatedProject = await Project.findByIdAndUpdate(proId, {
      $set: editedForm,
    });
    console.log("Server side project edited");
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.log("Error editing project", error);
    return NextResponse.json({ status: 400 });
  }
}
