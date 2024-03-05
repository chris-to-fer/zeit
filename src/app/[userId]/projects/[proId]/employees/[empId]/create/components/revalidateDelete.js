"use server";
import React from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export default async function revalidateDelete(proId, empId, userId) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  // revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
  // redirect(`${userId}/projects/${proId}/employees/${empId}`);
}
