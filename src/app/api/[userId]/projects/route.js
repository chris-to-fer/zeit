import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";

export async function POST(request, { params, searchParams }, response) {
  const userId = params.userId;
  try {
    await connectDB();

    const dataFromForm = await request.json();

    const newProject = await Project.create(dataFromForm);
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
}
