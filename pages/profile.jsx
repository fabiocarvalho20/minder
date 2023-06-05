import { signOut } from "next-auth/react";
import { Button, Link, TextField } from "@mui/material";
import MyPosts from "../components/myposts";
import { useEffect, useState } from "react";
import Image from "next/image";
import PageWrapper from "../components/PageWrapper";

export default function Profile() {
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

  return (
    <PageWrapper>
      {(user) => (
        <>
          <div>{user.email}</div> <br />
          <div> {user.name}</div>
          <br />
          <Image
            style={{ borderRadius: "5px" }}
            width={100}
            height={100}
            alt="Profile picture"
            src={user.image}
          />
          <br />
          <Link href="/">
            <Button onClick={() => signOut()} variant="contained">
              Sign out
            </Button>
          </Link>
          <MyPosts posts={posts} setPosts={setPosts} />
        </>
      )}
    </PageWrapper>
  );
}
