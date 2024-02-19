import React from "react";
import { revalidatePath } from "next/cache";

export default async function Page({ params }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;
  revalidatePath(
    `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`
  );

  const res = await fetch(
    `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("response", res);
  const data = await res.json();

  if (!data) return null;
  const {
    employee: { times },
  } = data;

  console.log("data", times);
  return (
    <>
      <h3>Arbeitszeiten nach Kalenderwochen von XX</h3>
    </>
  );
}
