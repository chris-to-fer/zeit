import styles from "./page.module.css";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import Sidebar from "./components/Sidebar";
import SelectStateProvider from "@/app/selectState-provider";
import { revalidatePath } from "next/cache";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ServerComponent from "@/app/session-action";
import { cookies } from "next/headers";

export default async function Page({ children, params }) {
  // Get sessionToken object
  const cookieStore = cookies();
  let sessionTokenCookie = cookieStore.get("next-auth.session-token");
  let sessionToken = sessionTokenCookie.value;
  const session = await ServerComponent();
  const HOSTNAME = process.env.HOSTNAME_URL;
  const userId = params.userId;

  // if (!session) return <h3>Please login.</h3>;

  revalidatePath(`${HOSTNAME}/`);

  const res = await fetch(`${HOSTNAME}/api/${userId}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `next-auth.session-token=${sessionToken};path=/;expires=Session`,
    },
  });
  const data = (await res.json()) || [];
  if (!data) return <h3>Data is loading..</h3>;

  const user = data.user;

  return (
    <>
      <SelectStateProvider>
        {children}
        <Sidebar projects={user.projects} params={params} />
        <div className={styles.card_project}>
          {/* {session && <p>Signed in as {session.user.email}</p>}
          {!session && <p>Not signed in</p>} */}
          <ProjectCard user={user} userId={userId} />
        </div>
      </SelectStateProvider>
    </>
  );
}
