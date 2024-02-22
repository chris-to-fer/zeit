import { headers } from "next/headers";
import Sidebar from "../components/Sidebar";
import styles from "../page.module.css";
import Link from "next/link";

export default async function Page({ children, params }) {
  const userId = params.userId;
  const proId = params.proId;

  const HOSTNAME = process.env.HOSTNAME_URL;

  const res = await fetch(`${HOSTNAME}/api/${userId}/projects/${proId}`, {
    method: "GET",
    cache: "no-store",
  });
  // , {
  //   method: "GET",
  //   // headers: headers(),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const data = await res.json();
  if (!data) return <h3>loading</h3>;
  const {
    projects: { employees },
  } = data;
  console.log("data hier", data);

  return (
    <>
      <Sidebar params={params} project={data.projects} />
      <div className={styles.card_project}>
        <h2>Mitarbeiter des Projekts </h2>
        <ul>
          {employees.map((e) => (
            <Link
              href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${e._id}`}
              key={e._id}
            >
              <li>
                {e.name} {e.lastName} <strong>{e.position}</strong>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}
