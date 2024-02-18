import React from "react";
import ProjectForm from "./components/ProjectForm";
// import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Create({ params }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const userId = params.userId;
  async function revalidate() {
    "use server";
    revalidatePath(`${HOSTNAME}/${userId}/projects`);
    redirect(`${HOSTNAME}/${userId}/projects`);
  }
  return <ProjectForm params={params} revalidate={revalidate} />;
}
