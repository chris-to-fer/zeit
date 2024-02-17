import React from "react";
import ProjectForm from "./components/ProjectForm";
import { headers } from "next/headers";

export default function Create({ params }) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  console.log("fu", fullUrl);
  return <ProjectForm params={params} />;
}
