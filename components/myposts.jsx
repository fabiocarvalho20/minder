import MyPostCard from "./MyPostCard";
import styles from "../styles/General.module.css"
import { useSession } from "next-auth/react";

export default function MyPosts({posts}) {
    const { data: session } = useSession();

  return (
    <div className={styles.feed}>
      {posts?.map((post) => {
       if (post.author.email === session.user.email) {
        return (
            <MyPostCard id={post.id} name={post.author.name} image={post.author.image} date={post.createdAt} content={post.content} />
          )
       }
    })} 
    </div>
  );
}
