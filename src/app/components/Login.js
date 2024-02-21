"use client";
import { useState } from "react";
import styles from "./login.module.css";
import { signOut, signIn, useSession } from "next-auth/react";

export default function Login(props) {
  const { data: session } = useSession();

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    // Code to handle login goes here
    props.toggle();
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        {/* <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form> */}
        <button onClick={() => signIn()}>Login</button>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}
