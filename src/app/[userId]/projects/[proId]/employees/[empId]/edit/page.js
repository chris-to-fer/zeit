import EmpForm from "../../../create/components/EmpForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/app/db/connectDB";
import Employee from "@/app/db/model/Employee";

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
      const updatedEmployee = await Employee.findByIdAndUpdate(empId, data);
      if (!updatedEmployee) {
        throw new Error("Editing employee failed");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      revalidatePath(
        `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`
      );
      redirect(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
    }
  }

  async function revalidateDelete() {
    "use server";

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
