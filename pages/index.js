import { Button, TextField } from "@mui/material";
import styles from "../styles/General.module.css";
import Navbar from "../components/navbar";
import { useSession } from "next-auth/react";
import SingIn from "../components/Sing-in";
import { useState } from "react";
import Feed from "../components/feed";

export default function Home() {
  const { data: session } = useSession();

  const [postContent, setPostContent] = useState("")

  const handleCreatePost = () => {
    setPostContent("")
    fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({
        content: postContent
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
  }

  if (session) {
    return (
      <div className={styles.box}>
        <Navbar />
        <h2>Feed</h2>
        <div className={styles.postarea}>
          <TextField
            id="outlined-multiline-flexible"
            label="just put it into words"
            multiline
            maxRows={5}
            value={postContent}
            style={{ width: "500px", marginRight: "20px"}}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <Button onClick={handleCreatePost} variant="contained" color="success">
            post
          </Button>
        </div>
        <Feed/>
      </div>
    );
  }
  return <SingIn />;
}


