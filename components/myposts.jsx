import MyPostCard from "./MyPostCard";
import styles from "../styles/General.module.css";
import { useSession } from "next-auth/react";

export default function MyPosts({ posts, setPosts }) {
  const { data: session } = useSession();

  return (
    <div className={styles.feed}>
      {posts?.map((post) => {
        if (post.author.email === session.user.email) {
          return <MyPostCard refreshPosts={setPosts} post={post} />;
        }
      })}
    </div>
  );
}
