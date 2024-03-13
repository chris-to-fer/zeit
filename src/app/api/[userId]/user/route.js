import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import Project from "@/app/db/model/Project";
import ServerComponent from "@/app/session-action";
import { getToken } from "next-auth/jwt";
import { auth } from "../../auth/[...nextauth]/route";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req, { params, searchParams }, response) {
  // const token = await getToken({ req, secret });
  // const session = await auth();
  // console.log("jwt: ", session);

  // if (token) {
  //   // Signed in
  //   console.log("JSON Web Token", JSON.stringify(token.accessToken, null, 2));
  //   console.log("at", token.accessToken);
  // } else {
  //   console.log("Not Signed in");
  //   console.log("at", token);
  // res.status(401)
  // }
  const session = await ServerComponent();
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  console.log("sessioOn", session);
  await connectDB();
  const { userId, proId, empId } = params;

  const user = await User.findById(userId).populate("projects");
  if (!user) {
    return NextResponse.json({ status: 414 });
  }
  return NextResponse.json({ user }, { status: 200 });
}

export async function POST(request, { params, searchParams }, response) {
  await connectDB();
  const data = await request.json();
  const method = await data.method;
  const { userId } = params;

  if (method === "CREATEPROJECT") {
    try {
      const newProject = await Project.create(data);
      await User.findByIdAndUpdate(
        userId,
        { $push: { projects: newProject._id } },
        { new: true }
      );
      return NextResponse.json({ status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  }
}
