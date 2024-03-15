"use client";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { revalidatePath } from "next/cache";

export default function ModalServ({ params, HOSTNAME }) {
  const router = useRouter();
  const { userId, empId, proId, timeId } = params;

  function handleClick() {
    // revalidatePath("/");
    // router.refresh(
    //   `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}/${timeId}`
    // );
    router.back();
  }

  return (
    <section className={styles.modal_server_container}>
      <div className={styles.modal_server}>
        <h3>Datum Fehler!</h3>

        <p>Das Datum existiert bereits oder liegt in der Zukunft.</p>

        <button className={styles.button} onClick={handleClick}>
          Schließen
        </button>
      </div>
    </section>
  );
}
