"use client";
import React from "react";
import TimeForm from "./components/TimeForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ModalDoubleDate from "@/app/lib/ModalDoubleDate";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TimesheetCreatePage({ params }) {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const router = useRouter();
  function handleShowError() {
    setErrorModalOpen(true);
  }
  function handleCloseError() {
    setErrorModalOpen(false);
  }
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;

  async function handleSubmit(formData) {
    // "use server";
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      method: "CREATETIMESHEET",
      projectId: proId,
      employeeId: empId,
      start: data.start.toString(),
      end: data.end.toString(),
      travelTo: data.travelTo.toString(),
      travelBack: data.travelBack.toString(),
      break: data.break.toString(),
      approved: false,
    };

    const checkDouble = await fetch(
      `/api/${userId}/projects/${proId}/employees/${empId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, check: true }),
      }
    );
    const answer = await checkDouble?.json();
    if (answer.message === "DATUM") return handleShowError();

    const response = await fetch(
      `/api/${userId}/projects/${proId}/employees/${empId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const error = await response?.json();
    if (error.message === "FUTURE") return handleShowError();

    if (response.status === 200) {
      router.refresh(`/${userId}/projects/${proId}/employees/${empId}`);
      redirect(`/${userId}/projects/${proId}/employees/${empId}`);
    }
    if (response.status > 399) {
      console.log(error);
    }
    if (response.error) {
      throw new Error(error);
    }
  }

  return (
    <>
      <div>
        <ModalDoubleDate
          isOpen={errorModalOpen}
          message="Datum existiert schon oder liegt in der Zukunft."
          onRequestClose={handleCloseError}
        />
        <h3>Geben Sie Ihre Zeiten ein:</h3>
        <br></br>
        <TimeForm handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
