import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import User from "@/app/db/model/User";

export async function GET(request, { params, searchParams }) {
  const userId = params.userId;
  try {
    await connectDB();
    const userId = params.userId;
    const createFormData = request.body;
    const newProject = await Project.create(createFormData);
    await User.findByIdAndUpdate(
      userId,
      { $push: { projects: newProject._id } },
      { new: true }
    );
    console.log("Server side project created");
    console.log("Server Body received", request.body);
    return NextResponse.json({ status: 201 }, { status: "Project created" });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
}
