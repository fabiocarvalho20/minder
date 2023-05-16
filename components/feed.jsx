import PostCard from "./postCard";
import styles from "../styles/General.module.css"

export default function Feed({posts}) {

  return (
    <div className={styles.feed}>
      {posts?.map((post) =>
       (
        <PostCard name={post.author.name} image={post.author.image} date={post.createdAt} content={post.content} />
      ))} 
    </div>
  );
}
