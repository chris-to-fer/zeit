import { headers } from "next/headers";
import Sidebar from "../components/Sidebar";
import styles from "../page.module.css";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import Employee from "@/app/db/model/Employee";
import { doesSectionFormatHaveLeadingZeros } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

export default async function Page({ children, params }) {
  const userId = params.userId;
  const proId = params.proId;
  const HOSTNAME = process.env.HOSTNAME_URL;
  revalidatePath(`${HOSTNAME}/api/${userId}/projects/${proId}`);

  // const res = await fetch(`${HOSTNAME}/api/${userId}/projects/${proId}`, {
  // method: "GET",
  // headers: headers(),
  // cache: "no-store",
  // });
  // , {
  //   method: "GET",
  //   // headers: headers(),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await res.json();

  let data = null;
  try {
    await connectDB();
    const res = await Project.findById(proId).populate("employees");
    if (!res) {
      throw new Error("Projects could not be fetched.");
    }
    data = await JSON.parse(JSON.stringify(res));
  } catch (error) {
    throw new Error(error);
  }
  const newData = { projects: { ...data } };
  data = newData;

  const {
    projects: { employees },
  } = data;

  return (
    <>
      <Sidebar params={params} project={data.projects} />
      <div className={styles.card_project}>
        <h2>Mitarbeiter von {data.projects.name}</h2>
        <ul className={styles.ul}>
          {employees.map((e) => (
            <Link
              href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${e._id}`}
              key={e._id}
            >
              <button className={styles.button}>
                <li>
                  {e.name} {e.lastName} <i>{e.department}:</i>{" "}
                  <i>{e.position}</i>{" "}
                  <strong>{e.active ? "aktiv" : "nicht aktiv"}</strong>
                </li>
              </button>
            </Link>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}
