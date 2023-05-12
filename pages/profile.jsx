import Navbar from "../components/navbar";
import { useSession, signOut } from "next-auth/react";
import styles from ".././styles/General.module.css";
import { Link } from "@mui/material";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <div className={styles.box}>
      <Navbar />
      <div>{session.user.email}</div> <br/>
      <div> {session.user.name}</div>
      <br />
      <img src={session.user.image} height="100px" width="100px" /> <br />
      <Link href="/">
        <button onClick={() => signOut()}>Sign out</button>
      </Link>
    </div>
  );
}
