"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Login from "./components/Login";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [seen, setSeen] = useState(false);
  const { data: session, status, user } = useSession();

  useEffect(() => {
    session && router.push(`/${session?.user.userId}/projects`);
  }, [session, user, router]);

  return (
    <main className={styles.main}>
      <div className={styles.button}>
        {!session && (
          <p>
            Neu hier?&nbsp;
            <Link href="/register">
              <code className={styles.code}>registrieren</code>
            </Link>
          </p>
        )}
        {session && <p>angemeldet als {session.user.name}</p>}
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
      {session && <p>Weiterleitung</p>}
      {/* {!session && <p>Not signed in</p>} */}

      <div className={styles.loginButtonsContainer}>
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

        {seen && <Login seen={seen} setSeen={setSeen} />}
        {!session && (
          <button onClick={() => signIn("github")} className={styles.button}>
            <Image
              src="/github-mark.png"
              alt="Github-Logo"
              width={20}
              height={20}
            />
            anmelden mit Github
          </button>
        )}
        {!session && (
          <button onClick={() => signIn("google")} className={styles.button}>
            <Image src="/google.png" alt="Github-Logo" width={20} height={20} />
            anmelden mit Google
          </button>
        )}
        {!session && (
          <button className={styles.button} onClick={() => setSeen(true)}>
            Email Login
          </button>
        )}
        {/* {session && (
          <button onClick={() => signOut()} className={styles.card}>
            <h2>Logout</h2>
            <p></p>
          </button>
        )} */}
      </div>
    </main>
  );
}
