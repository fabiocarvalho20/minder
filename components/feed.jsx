import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
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
    fetchPosts();
  }, []);

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}
