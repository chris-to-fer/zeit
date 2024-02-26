"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [seen, setSeen] = useState(false);
  const { data: session, status, user } = useSession();
  console.log("session", session);
  console.log("user", user);
  console.log("status", status);

  useEffect(() => {
    session && router.push(`/${session?.user.userId}/projects`);
  }, [session, user, router]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* <p>
          New here?&nbsp;
          <code className={styles.code}>register</code>
          {session && "you are logged in"}
        </p> */}
        {/* <div>
          <a href="https://google.de" target="_blank" rel="noopener noreferrer">
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      <div className={styles.center}>
        <h1>z e i t</h1>
      </div>
      {session && <p>Signed in as {session.user.email}</p>}
      {/* {!session && <p>Not signed in</p>} */}

      <div>
        {/* <a
          href="https://google.de"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            How does it work? <span>-&gt;</span>
          </h2>
          <p>Quick overview and demo.</p>
        </a> */}
        {!session && (
          <button onClick={() => signIn()} className={styles.card}>
            <h2>Login</h2>
            <p></p>
          </button>
        )}
        {session && (
          <button onClick={() => signOut()} className={styles.card}>
            <h2>Logout</h2>
            <p></p>
          </button>
        )}
      </div>
    </main>
  );
}
