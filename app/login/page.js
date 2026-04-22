"use client"

import API from "../lib/api"
import { useRouter } from "next/navigation"
import Navbar from "../consponents/Navbar"
import Link from "next/link"
import { useState } from "react"
import { notifyAuthChanged } from "../lib/auth"

export default function Login(){
    const [form,setForm]=useState({email:"",password:""})
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const router=useRouter();

    const handlesubmit=async(e)=>{
         e.preventDefault();
         setError("");
         setLoading(true);
         try{
            const res=await API.post("/auth/login",form)
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user))
            notifyAuthChanged();
            router.push(res.data.user?.isAdmin ? "/admin/dashboard" : "/")
         }catch(err){
            setError(err.response?.data?.message || "Login failed")
         }finally{
            setLoading(false)
         }
    }
    return (
        <div>
            <Navbar/>
            <main className="auth-shell">
                <section className="auth-panel">
                    <p className="eyebrow">Welcome back</p>
                    <h1>Login to your account</h1>
                    <form onSubmit={handlesubmit} className="form-stack">
                        <label>
                            Email
                            <input type="email" value={form.email} placeholder="you@example.com" onChange={(e)=>setForm({...form,email:e.target.value})} required/>
                        </label>
                        <label>
                            Password
                            <input type="password" value={form.password} placeholder="Your password" onChange={(e)=>setForm({...form,password:e.target.value})} required/>
                        </label>
                        {error && <p className="status-message error">{error}</p>}
                        <button className="primary-action" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                    </form>
                    <p className="auth-note">New here? <Link href="/register">Create an account</Link></p>
                </section>
            </main>
        </div>
    )
}
