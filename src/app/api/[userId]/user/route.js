import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import mongoose from "mongoose";
import User from "@/app/db/model/User";

export async function GET(request, { params, searchParams }) {
  await connectDB();
  const userId = params.userId;

  const user = await User.findById(userId).populate("projects");
  return NextResponse.json({ user }, { status: 200 });
}

//this outputs bar
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   console.log(request.nextUrl.searchParams.get("foo"));
//   return new Response("Hello, Next.js!");
// }

// GET http://localhost:3000/api/hello?foo=bar

//params example client side only
// import { useParams } from 'next/navigation'

// export default function ExampleClientComponent() {
//   const params = useParams()

//   // Route -> /shop/[tag]/[item]
//   // URL -> /shop/shoes/nike-air-max-97
//   // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
//   console.log(params)

//   return <></>
// }
