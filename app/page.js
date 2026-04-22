"use client"
import Image from "next/image";
import API from "./lib/api"
import Link from "next/link";
import Navbar from "./consponents/Navbar";
import { useEffect, useState } from "react";
export default function Home() {
  const [posts,setPosts]=useState([]);
  const user=typeof window!=="undefined" ? JSON.parse(localStorage.getItem("user")):null

  useEffect(()=>{
    API.get("/posts").then((res)=>setPosts(res.data))
  })
  const deletePost=async(id)=>{
    await API.delete(`/posts/$id`);
    setPosts(posts.filter((p)=>p._id!==id))
  }
  return (
      <div>
        <Navbar/>
        <h1>Blog</h1>

        <div>Top Banner id</div>
        {
          posts.map((post)=>(
            <div key={post._id}>
              <h2>
                <Link href={`/post/${post._id}`}>{post.title}</Link>
              </h2>
              {
                user?.isAdmin && (
                  <button onClick={()=>deletePost(post._id)}>Delete</button>
                )
              }
              <div>Ad</div>
            </div>
          ))
        }
      </div>
  );
}
