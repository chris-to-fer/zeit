import React from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import EmpForm from "./components/EmpForm";
import connectDB from "@/app/db/connectDB";
import Employee from "@/app/db/model/Employee";
import Project from "@/app/db/model/Project";

export default function CreateEmployees({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;

  async function handleSubmit(formData) {
    "use server";
    let data = Object.fromEntries(formData);
    data = { ...data, method: "CREATEEMPLOYEE", project: proId };
    // const response = await fetch(
    //   `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );
    try {
      await connectDB();
      const newEmployee = await Employee.create(data);
      await Project.findByIdAndUpdate(
        proId,
        { $push: { employees: newEmployee._id } },
        { new: true }
      );
      if (!newEmployee) {
        throw new Error("Error creating employee");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      revalidatePath(`/${HOSTNAME}/${userId}/projects/${proId}`);
      redirect(`/${userId}/projects/${proId}`);
    }
  }

  return (
    <div>
      <h3>Mitarbeiter hinzuzufügen</h3>
      <br></br>
      <EmpForm
        defaultValue={searchParams}
        params={params}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
