import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/db/model/Project";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Employee from "@/app/db/model/Employee";
import Time from "@/app/db/model/Time";
import { revalidatePath } from "next/cache";
import NextAuth from "next-auth/next";
import ServerComponent from "@/app/session-action";

export async function GET(request, { params, searchParams }) {
  //GET EMPLOYEES OVER PROJECTS POPULATE for Mitarbeiter des Projekts Page
  // const session = ServerComponent();
  // if (!session) {
  //   return NextResponse.json(
  //     { message: "You must be logged in." },
  //     { status: 401 }
  //   );
  // }
  // console.log("sessioOn", session);
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { proId, userId, empId } = params;
  revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
  await connectDB();

  const projects = await Project.findById(proId).populate("employees");
  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(request, { params, searchParams }) {
  //EDIT PROJECT

  // const session = await ServerComponent();
  // console.log("sessioOn", session);
  // if (!session) {
  //   return NextResponse.json(
  //     { message: "You must be logged in." },
  //     { status: 401 }
  //   );
  // }

  await connectDB();
  const { empId, userId, proId } = params;
  const data = await request.json();
  const method = await data.method;

  // if (data.projectCode) {
  if (method === "EDITPROJECT") {
    try {
      const updatedProject = await Project.findByIdAndUpdate(proId, {
        $set: data,
      });

      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  } else if (data.method === "DELETEPROJECT") {
    //DELETE PROJECT

    try {
      const projectToDelete = await Project.findByIdAndDelete(proId);
      await User.findByIdAndUpdate(userId, {
        $pull: { projects: proId },
      });
      const deletedCount = await Time.deleteMany({
        projectId: proId,
      });
      projectToDelete.employees.map(async (e) => {
        await Employee.findByIdAndUpdate(e, {
          $pull: { projectId: proId },
        });
      });
      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  }
}
