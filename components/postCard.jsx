import * as React from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/General.module.css";

export default function PostCard({ post, refreshPosts }) {
  const { data: session } = useSession();

  const liked = post.likes.map((like) => like.userId).includes(session.user.id);

  const handleDislike = async () => {
    await fetch("/api/posts/dislike", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    refreshPosts();
  };

  const handleLike = async () => {
    await fetch("/api/posts/like", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    refreshPosts();
  };

  return (
    <Link href={`/post/${post.id}`}>
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
              <Link href={`/profile/${post.author.id}`}>
                <Image
                  style={{ marginRight: "10px" }}
                  className={styles.profileimg}
                  width={40}
                  height={40}
                  alt="Profile picture"
                  src={post.author.image}
                />
              </Link>
              {post.author.name}
            </div>
            {format(new Date(post.createdAt), "HH:mm - dd/LLL/yyyy")}
          </div>
          <Typography sx={{ marginTop: 1 }} variant="body2" color="whitesmoke">
            {post.content}
          </Typography>
        </CardContent>
        <div className={styles.cardbar}>
          <div></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                color: "white",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              {post.likes.length}
            </div>
            {liked ? (
              <Link href={"/"}>
                <ThumbUpIcon
                  onClick={handleDislike}
                  sx={{
                    color: "blue",
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "pointer",
                  }}
                />
              </Link>
            ) : (
              <Link href={"/"}>
                <ThumbUpIcon
                  onClick={handleLike}
                  sx={{
                    color: "white",
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "pointer",
                  }}
                />
              </Link>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
