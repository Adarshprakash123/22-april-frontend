"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../consponents/Navbar";
import API from "../../lib/api";

const emptyPost={title:"",author:"Admin",content:""};

export default function AdminPosts(){
    const router=useRouter();
    const [posts,setPosts]=useState([]);
    const [form,setForm]=useState(emptyPost);
    const [editingId,setEditingId]=useState("");
    const [message,setMessage]=useState("");

    const loadPosts=()=>API.get("/posts").then((res)=>setPosts(res.data));

    useEffect(()=>{
        const savedUser=localStorage.getItem("user");
        const user=savedUser ? JSON.parse(savedUser) : null;
        if(!user?.isAdmin){
            router.push("/login");
            return;
        }
        loadPosts();
    },[router])

    const submitPost=async(e)=>{
        e.preventDefault();
        setMessage("");
        if(editingId){
            await API.put(`/posts/${editingId}`,form);
            setMessage("Post updated");
        }else{
            await API.post("/posts",form);
            setMessage("Post created");
        }
        setForm(emptyPost);
        setEditingId("");
        loadPosts();
    }

    const editPost=(post)=>{
        setEditingId(post._id);
        setForm({
            title:post.title || "",
            author:post.author || "Admin",
            content:post.content || post.Content || ""
        });
    }

    const deletePost=async(id)=>{
        await API.delete(`/posts/${id}`);
        setPosts(posts.filter((post)=>post._id!==id));
    }

    return(
        <div>
            <Navbar/>
            <main className="page-shell admin-layout">
                <section className="admin-toolbar">
                    <div>
                        <Link href="/admin/dashboard" className="back-link">Admin dashboard</Link>
                        <h1>Posts</h1>
                    </div>
                </section>

                <section className="editor-grid">
                    <form className="form-stack editor-panel" onSubmit={submitPost}>
                        <h2>{editingId ? "Edit post" : "Create post"}</h2>
                        <label>
                            Title
                            <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required/>
                        </label>
                        <label>
                            Author
                            <input value={form.author} onChange={(e)=>setForm({...form,author:e.target.value})}/>
                        </label>
                        <label>
                            Content
                            <textarea value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})} required rows={9}/>
                        </label>
                        {message && <p className="status-message">{message}</p>}
                        <div className="button-row">
                            <button className="primary-action">{editingId ? "Update" : "Create"}</button>
                            {editingId && <button type="button" className="secondary-action" onClick={()=>{setEditingId(""); setForm(emptyPost)}}>Cancel</button>}
                        </div>
                    </form>

                    <div className="admin-list">
                        {posts.map((post)=>(
                            <article className="admin-row" key={post._id}>
                                <div>
                                    <h3>{post.title}</h3>
                                    <p>{(post.content || post.Content || "").slice(0,120)}...</p>
                                </div>
                                <div className="row-actions">
                                    <button className="secondary-action" onClick={()=>editPost(post)}>Edit</button>
                                    <button className="danger-button" onClick={()=>deletePost(post._id)}>Delete</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
