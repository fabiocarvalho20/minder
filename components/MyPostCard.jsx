import * as React from "react";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/General.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MyPostCard({ post, refreshPosts }) {
  const handleDeletePost = async () => {
    await fetch("/api/posts/delete", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    post.id;
    fetchPosts();
  };

  const fetchPosts = async () => {
    const res = await fetch("/api/posts/list", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    refreshPosts(data);
  };

  return (
    <Card
      sx={{
        minWidth: 600,
        maxWidth: 600,
        marginBottom: 2.5,
        backgroundColor: "rgb(29, 155, 240)",
        borderRadius: 5,
      }}
    >
      <CardContent>
        <div className={styles.cardbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/profile" style={{ marginRight: "10px" }}>
              <Image
                className={styles.profileimg}
                width={40}
                height={40}
                alt="Profile picture"
                src={post.author.image}
              />
            </Link>
            {post.name}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DeleteIcon
              onClick={handleDeletePost}
              style={{ marginRight: "10px" }}
            />
            {format(new Date(post.createdAt), "HH:mm - dd/LLL/yyyy")}
          </div>
        </div>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="whitesmoke">
          {post.content}
        </Typography>
      </CardContent>
      <div className={styles.cardbar}>
        <div></div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              color: "white",
              marginRight: "15px",
              marginBottom: "15px",
            }}
          >
            likes: {post.likes.length}
          </div>
        </div>
      </div>
    </Card>
  );
}
