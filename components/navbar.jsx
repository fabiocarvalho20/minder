import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../styles/General.module.css";

export default function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={styles.navbar}>
        <Link href="/">
        <Image
          width={150}
          height={50}
          alt="logo"
          src="/logo.png"
        />
        </Link>
        <Link href="/profile">
        <Image
          className={styles.profileimg}
          width={40}
          height={40}
          alt="Profile picture"
          src={session.user.image}
        />
        </Link>
      </div>
    );
  }
}
