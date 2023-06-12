import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import PageWrapper from "../../components/pageWrapper";
import ProfilePosts from "../../components/profilePosts";

export default function userEmai() {
  const router = useRouter();
  const userId = router.query.userId;

  const [posts, setPosts] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    posts?.map((post) => {
      if (post.author.id === userId) {
        setImage(post.author.image);
      }
    });
  }, [posts]);

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
            src={image}
          />
          <br />
          <ProfilePosts id={userId} posts={posts} setPosts={setPosts} />
        </>
      )}
    </PageWrapper>
  );
}
