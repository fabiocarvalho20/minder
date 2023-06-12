import PostCard from "./postCard";
import styles from "../styles/General.module.css";

export default function ProfilePosts({ id, posts, setPosts }) {
  return (
    <div className={styles.feed}>
      {posts?.map((post) => {
        if (post.author.id === id) {
          return <PostCard refreshPosts={setPosts} post={post} />;
        }
      })}
    </div>
  );
}
