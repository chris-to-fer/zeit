"use client";
import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Exit({ goHome }) {
  const signOutandToHome = () => {
    signOut();
    goHome();
  };
  return <button onClick={signOutandToHome}>Logout</button>;
}
