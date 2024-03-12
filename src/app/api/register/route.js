import { NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/model/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error during register" },
      { status: 500 }
    );
  }
}
