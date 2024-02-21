"use client";
import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Exit() {
  return <button onClick={signOut}>Logout</button>;
}
