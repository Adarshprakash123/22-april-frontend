"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../consponents/Navbar";
import API from "../../lib/api";

export default function AdminUsers(){
    const router=useRouter();
    const [users,setUsers]=useState([]);
    const [message,setMessage]=useState("");

    const loadUsers=()=>API.get("/users").then((res)=>setUsers(res.data));

    useEffect(()=>{
        const savedUser=localStorage.getItem("user");
        const user=savedUser ? JSON.parse(savedUser) : null;
        if(!user?.isAdmin){
            router.push("/login");
            return;
        }
        loadUsers();
    },[router])

    const toggleAdmin=async(user)=>{
        const res=await API.put(`/users/${user._id}`,{isAdmin:!user.isAdmin});
        setUsers(users.map((item)=>item._id===user._id ? res.data : item));
        setMessage("User updated");
    }

    const deleteUser=async(id)=>{
        await API.delete(`/users/${id}`);
        setUsers(users.filter((user)=>user._id!==id));
        setMessage("User deleted");
    }

    return(
        <div>
            <Navbar/>
            <main className="page-shell">
                <section className="admin-toolbar">
                    <div>
                        <Link href="/admin/dashboard" className="back-link">Admin dashboard</Link>
                        <h1>Users</h1>
                    </div>
                </section>
                {message && <p className="status-message">{message}</p>}
                <section className="admin-list">
                    {users.map((user)=>(
                        <article className="admin-row" key={user._id}>
                            <div>
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </div>
                            <span className={user.isAdmin ? "role-pill admin" : "role-pill"}>{user.isAdmin ? "Admin" : "User"}</span>
                            <div className="row-actions">
                                <button className="secondary-action" onClick={()=>toggleAdmin(user)}>{user.isAdmin ? "Make user" : "Make admin"}</button>
                                <button className="danger-button" onClick={()=>deleteUser(user._id)}>Delete</button>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}
