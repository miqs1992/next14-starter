import styles from "./blog.module.css";
import PostCard from "@/components/postCard/PostCard";
// import {getPosts} from "@/lib/data";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {cache: "no-store"});

  if(!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}

const BlogPage = async () => {
  const posts = await getData();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
