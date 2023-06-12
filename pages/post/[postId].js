import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "../../components/postCard";
import PageWrapper from "../../components/pageWrapper";
import styles from "../../styles/General.module.css";
import { Button, TextField } from "@mui/material";
import CommentCard from "../../components/comment";

export default function id() {
  const router = useRouter();
  const postId = router.query.postId;

  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (postId) fetchPost(), fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    console.log(postId);
    const res = await fetch(`/api/posts/get/${postId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    setPost(data);
  };

  const fetchComments = async () => {
    const res = await fetch("/api/posts/commentlist", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    setComments(data);
  };

  const handleComment = async () => {
    await fetch("/api/posts/comment", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
        content: commentContent,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    fetchPost();
    fetchComments();
    setCommentContent("");
  };

  return (
    <PageWrapper>
      {() => (
        <>
          <div style={{ marginTop: "70px" }}>
            {post && <PostCard post={post} refreshPosts={fetchPost} />}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="give your thoughts on this post"
              multiline
              maxRows={5}
              value={commentContent}
              style={{ width: "500px", marginRight: "20px" }}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button
              onClick={() => {
                handleComment();
              }}
              variant="contained"
            >
              post
            </Button>
          </div>
          <div className={styles.feed}>
            {comments?.map((comment) => (
              <CommentCard comment={comment} />
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
