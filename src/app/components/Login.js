"use client";
import { useState } from "react";
import styles from "./login.module.css";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login({ seen, setSeen }) {
  const { data: session } = useSession();
  console.log("session", session);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Anmeldedaten nicht gültig");
        return;
      }
      setSeen(false);
      console.log("res", res);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              // defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              // defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}

          <button type="button" onClick={() => setSeen(!seen)}>
            Close
          </button>
        </form>

        <p>
          Noch kein Konto? <Link href="/register">Registrieren</Link>
        </p>
      </div>
    </div>
  );
}
