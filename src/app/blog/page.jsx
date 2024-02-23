import styles from "./blog.module.css";
import PostCard from "@/components/postCard/PostCard";
import {getPosts} from "@/lib/data";

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "no-store"});

  if(!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}

const BlogPage = async () => {
  // const posts = [
  //   { id: 1, title: "Post 1", body: "Lorem ipsum statatata", userId: 1, createdAt: new Date(), img: "/about.png"},
  //   { id: 2, title: "Post 2", body: "......", userId: 1, createdAt: new Date(), img: "/about.png" },
  //   { id: 3, title: "Post 3", body: "......", userId: 2, createdAt: new Date(), img: "/about.png" },
  //   { id: 4, title: "Post 4", body: "......", userId: 2, createdAt: new Date(), img: "/about.png"},
  // ];

  const posts = await getPosts();

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
