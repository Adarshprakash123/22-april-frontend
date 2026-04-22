"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../consponents/Navbar";
import API from "../../lib/api";

export default function AdminDashboard(){
    const router=useRouter();
    const [stats,setStats]=useState({posts:0,users:0});

    useEffect(()=>{
        const savedUser=localStorage.getItem("user");
        const user=savedUser ? JSON.parse(savedUser) : null;
        if(!user?.isAdmin){
            router.push("/login");
            return;
        }

        Promise.all([API.get("/posts"), API.get("/users")])
            .then(([postsRes, usersRes])=>setStats({posts:postsRes.data.length, users:usersRes.data.length}))
            .catch(()=>setStats({posts:0,users:0}));
    },[router])

    return(
        <div>
            <Navbar/>
            <main className="page-shell">
                <section className="admin-hero">
                    <p className="eyebrow">Admin panel</p>
                    <h1>Manage blog content and users.</h1>
                    <div className="admin-actions">
                        <Link className="primary-action" href="/admin/posts">Manage posts</Link>
                        <Link className="secondary-action" href="/admin/users">Manage users</Link>
                    </div>
                </section>
                <section className="stat-grid">
                    <article className="stat-card">
                        <span>{stats.posts}</span>
                        <p>Total posts</p>
                    </article>
                    <article className="stat-card">
                        <span>{stats.users}</span>
                        <p>Total users</p>
                    </article>
                </section>
            </main>
        </div>
    )
}
