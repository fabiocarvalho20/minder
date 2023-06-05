import { Button, TextField } from "@mui/material";
import styles from "../styles/General.module.css";
import { useSession } from "next-auth/react";
import SingIn from "../components/Sing-in";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import PostCard from "../components/postCard";

export default function Home() {
  const { data: session } = useSession();

  const [postContent, setPostContent] = useState("");
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

  const handleCreatePost = async () => {
    await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({
        content: postContent,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    fetchPosts();
    setPostContent("");
  };

  if (session) {
    return (
      <PageWrapper>
        {() => (
          <>
            <div className={styles.postarea}>
              <TextField
                id="outlined-multiline-flexible"
                label="just put it into words"
                multiline
                maxRows={5}
                value={postContent}
                style={{ width: "500px", marginRight: "20px" }}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <Button onClick={handleCreatePost} variant="contained">
                post
              </Button>
            </div>
            <div className={styles.feed}>
              {posts?.map((post) => (
                <PostCard post={post} refreshPosts={fetchPosts} />
              ))}
            </div>
          </>
        )}
      </PageWrapper>
    );
  }
  return <SingIn />;
}
