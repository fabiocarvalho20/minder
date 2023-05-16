import Navbar from "../components/navbar";
import { useSession, signOut } from "next-auth/react";
import styles from ".././styles/General.module.css";
import { Button, Link } from "@mui/material";
import MyPosts from "../components/myposts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BorderOuterOutlined } from "@mui/icons-material";

export default function Profile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts/list", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    setPosts(data);
  };
  console.log(posts);
  return (
    <div className={styles.box}>
      <Navbar />
      <div>{session.user.email}</div> <br />
      <div> {session.user.name}</div>
      <br />
      <Image
        style={{ borderRadius: "5px" }}
        width={100}
        height={100}
        alt="Profile picture"
        src={session.user.image}
      />{" "}
      <br />
      <Link href="/">
        <Button onClick={() => signOut()} variant="contained">
          Sign out
        </Button>
      </Link>
      <MyPosts posts={posts} />
    </div>
  );
}
