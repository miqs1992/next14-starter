import Image from "next/image";
import styles from "./singlePost.module.css";
import { Suspense } from "react";
import PostUser from "@/components/postUser/PostUser";
import {getPost} from "@/lib/data";

const getData = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if(!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}

const SinglePostPage = async ({params}) => {
  const post = await getPost(params.slug);

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {(post.createdAt || new Date()).toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc || post.body}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
