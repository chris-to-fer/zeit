"use server";
import React from "react";
import { revalidatePath } from "next/cache";

export default async function revalidateDelete() {
  revalidatePath(
    `/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
  );
}
