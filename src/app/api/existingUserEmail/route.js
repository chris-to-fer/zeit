import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    const userId = await User.findOne({ email }).select("_id");
    return NextResponse.json({ userId });
  } catch (error) {
    console.log(error);
  }
}
