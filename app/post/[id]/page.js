"use client"

import API from "../../lib/api"
import { useParams } from "next/navigation"
import Navbar from "../../consponents/Navbar"
import Link from "next/link";
import { useEffect, useState } from "react";

function AdSlot({ label, className="" }){
    return <div className={`ad-slot ${className}`}>{label}</div>
}

export default function PostDetail(){
    const {id}=useParams();
    const [post,setPost]=useState(null);
    const [error,setError]=useState("");

    useEffect(()=>{
        API.get(`/posts/${id}`)
            .then((res)=>setPost(res.data))
            .catch(()=>setError("Post not found or unavailable."));
    },[id])

    return(
        <div>
             <Navbar/>
             <main className="page-shell">
                <AdSlot label="Top banner ad" className="ad-wide" />
                {error && <p className="status-message error">{error}</p>}
                {!post && !error && <p className="status-message">Loading post...</p>}
                {post && (
                    <article className="article-view">
                        <Link href="/" className="back-link">Back to posts</Link>
                        <p className="eyebrow">{post.author || "Admin"}</p>
                        <h1>{post.title}</h1>
                        <div className="post-meta">
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>Blog detail</span>
                        </div>
                        <AdSlot label="In-article ad" />
                        <div className="article-body">
                            {(post.content || post.Content || "").split("\n").map((paragraph,index)=>(
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <AdSlot label="Bottom banner ad" className="ad-wide" />
                    </article>
                )}
             </main>
        </div>
    )
}
