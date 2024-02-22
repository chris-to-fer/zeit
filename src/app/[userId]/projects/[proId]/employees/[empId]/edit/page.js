import React from "react";
import EmpForm from "../../../create/components/EmpForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function PageEditEmployee({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;

  async function handleSubmit(formData) {
    "use server";
    // e.preventDefault();
    // console.log("submi clickt");
    //const formData = new FormData(e.target);
    const formedData = Object.fromEntries(formData);
    const data = { ...formedData, method: "EDITEMPLOYEE" };

    const response = await fetch(
      `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      // alert("Das Projekt wurde erstellt.");
      console.log("edit employee sent", data);
      //   revalidatePath(`${HOSTNAME}/${userId}/projects/employees/${empId}`);
      redirect(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
    }
  }
  async function revalidateDelete() {
    "use server";
    console.log("delete sent");
    revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}`);
    redirect(`${HOSTNAME}/${userId}/projects/${proId}`);
  }

  return (
    <>
      <EmpForm
        defaultValue={searchParams}
        params={params}
        handleSubmit={handleSubmit}
        revalidateDelete={revalidateDelete}
      />
    </>
  );
}