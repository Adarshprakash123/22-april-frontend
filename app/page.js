"use client"

import API from "./lib/api"
import Link from "next/link";
import Navbar from "./consponents/Navbar";
import { useEffect, useState } from "react";
import { useStoredUser } from "./lib/auth";

function AdSlot({ label, className="" }){
  return <div className={`ad-slot ${className}`}>{label}</div>
}

export default function Home() {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const user=useStoredUser();

  useEffect(()=>{
    API.get("/posts")
      .then((res)=>setPosts(res.data))
      .catch(()=>setError("Unable to load posts right now."))
      .finally(()=>setLoading(false))
  },[])

  const deletePost=async(id)=>{
    await API.delete(`/posts/${id}`);
    setPosts(posts.filter((p)=>p._id!==id))
  }

  const featuredPost=posts[0];
  const restPosts=posts.slice(1);

  return (
      <div>
        <Navbar/>
        <main className="page-shell">
          <AdSlot label="Top banner ad" className="ad-wide" />

          <section className="hero-blog">
            <div>
              <p className="eyebrow">Fresh writing, simple reading</p>
              <h1>Read the latest stories from the blog.</h1>
              <p className="hero-copy">A clean place for posts, details, accounts, and an admin workspace for managing users and articles.</p>
              <div className="hero-actions">
                <Link className="primary-action" href={user?.isAdmin ? "/admin/dashboard" : user ? "/" : "/register"}>
                  {user?.isAdmin ? "Open admin" : user ? "Browse posts" : "Join the blog"}
                </Link>
                <Link className="secondary-action" href={user?.isAdmin ? "/admin/posts" : user ? "/" : "/login"}>
                  {user?.isAdmin ? "Create post" : user ? "Read posts" : "Sign in"}
                </Link>
              </div>
            </div>
            <aside className="hero-panel">
              <span>{posts.length}</span>
              <p>published posts</p>
            </aside>
          </section>

          {error && <p className="status-message error">{error}</p>}
          {loading && <p className="status-message">Loading posts...</p>}

          {!loading && featuredPost && (
            <section className="featured-grid">
              <article className="featured-post">
                <p className="eyebrow">Featured</p>
                <h2><Link href={`/post/${featuredPost._id}`}>{featuredPost.title}</Link></h2>
                <p>{(featuredPost.content || featuredPost.Content || "").slice(0, 220)}...</p>
                <div className="post-meta">
                  <span>{featuredPost.author || "Admin"}</span>
                  <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                </div>
                {user?.isAdmin && (
                  <button className="danger-button" onClick={()=>deletePost(featuredPost._id)} title="Delete post">Delete</button>
                )}
              </article>
              <AdSlot label="Sidebar ad" className="ad-tall" />
            </section>
          )}

          <section className="content-layout">
            <div className="post-list">
              {restPosts.map((post,index)=>(
                <article className="post-card" key={post._id}>
                  <div>
                    <p className="eyebrow">{post.author || "Admin"}</p>
                    <h2><Link href={`/post/${post._id}`}>{post.title}</Link></h2>
                    <p>{(post.content || post.Content || "").slice(0, 150)}...</p>
                    <div className="post-meta">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <Link href={`/post/${post._id}`}>Read post</Link>
                    </div>
                  </div>
                  {user?.isAdmin && (
                    <button className="danger-button" onClick={()=>deletePost(post._id)} title="Delete post">Delete</button>
                  )}
                  {(index === 0 || index === 2) && <AdSlot label="In-content ad" />}
                </article>
              ))}
              {!loading && posts.length === 0 && <p className="status-message">No posts yet. Admin can create the first one.</p>}
            </div>
            <aside className="sticky-column">
              <AdSlot label="Sticky ad" />
              <AdSlot label="Bottom banner ad" />
            </aside>
          </section>
        </main>
      </div>
  );
}
