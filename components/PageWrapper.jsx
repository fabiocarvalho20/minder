import React from "react";
import SingIn from "./Sing-in";
import Navbar from "./navbar";
import styles from "../styles/General.module.css";
import { useSession } from "next-auth/react";

export default function PageWrapper({ children }) {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className={styles.box}>
        <Navbar />
        {children(session.user)}
      </div>
    );
  }

  return <SingIn />;
}
