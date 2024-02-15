import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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
        <h1>zeit</h1>
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
          <p>See how you save time and become accounting's best friend</p>
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

        <a
          href="https://google.de"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Login <span>-&gt;</span>
          </h2>
          <p></p>
        </a>
      </div>
    </main>
  );
}
