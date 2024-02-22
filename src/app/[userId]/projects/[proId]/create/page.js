import React from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import EmpForm from "./components/EmpForm";

export default function CreateEmployees({ params }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId } = params.userId;

  async function handleSubmit(formData) {
    "use server";
    let data = Object.fromEntries(formData);
    data = { ...data, method: "CREATEEMPLOYEE" };
    const response = await fetch(`${HOSTNAME}/api/${userId}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("create employee sent:", data);

      revalidatePath(`/${HOSTNAME}/${userId}/projects/${proId}`);
      redirect(`/${userId}/projects/${proId}`);
    }
  }

  return (
    <div>
      page um mitarbeiter hinzuzufügen
      <EmpForm params={params} handleSubmit={handleSubmit} />
    </div>
  );
}
