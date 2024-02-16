"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Login from "./components/Login";

export default function Home() {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          New here?&nbsp;
          <code className={styles.code}>register</code>
        </p>
        <div>
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
        </div>
      </div>

      <div className={styles.center}>
        <h1>z e i t</h1>
      </div>

      <div className={styles.grid}>
        <a
          href="https://google.de"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            How does it work? <span>-&gt;</span>
          </h2>
          <p>Quick overview and demo.</p>
        </a>

        <a
          href="https://google.de"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            What are the benefits? <span>-&gt;</span>
          </h2>
          <p>See how you save time and become accounting&apos;s best friend</p>
        </a>

        <a
          href="https://google.de"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Video <span>-&gt;</span>
          </h2>
          <p>Watch a 5 min explains it all video</p>
        </a>

        <button onClick={togglePop} className={styles.card}>
          <h2>
            Login <span>-&gt;</span>
          </h2>
          <p></p>
        </button>
        {seen ? <Login toggle={togglePop} /> : null}
      </div>
    </main>
  );
}
