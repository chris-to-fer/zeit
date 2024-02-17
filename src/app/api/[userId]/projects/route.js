import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import User from "@/app/db/model/User";
import { redirect } from "next/dist/server/api-utils";

export async function POST(request, { params, searchParams }, response) {
  console.log(params);
  const userId = params.userId;
  try {
    await connectDB();

    const createFormData = await request.json();

    const newProject = await Project.create(createFormData);
    await User.findByIdAndUpdate(
      userId,
      { $push: { projects: newProject._id } },
      { new: true }
    );

    console.log("Server side project created");
    console.log("Server Body received", request.body);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
}
