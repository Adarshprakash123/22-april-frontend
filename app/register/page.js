"use client"

import API from "../lib/api"
import { useRouter } from "next/navigation"
import Navbar from "../consponents/Navbar"
import Link from "next/link"
import { useState } from "react"

export default function Register(){
    const [form,setForm]=useState({username:"",email:"",password:""})
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const router=useRouter();

    const handlesubmit=async(e)=>{
         e.preventDefault();
         setError("");
         setLoading(true);
         try{
            await API.post("/auth/register",form);
            router.push("/login")
         }catch(err){
            setError(err.response?.data?.message || "Registration failed")
         }finally{
            setLoading(false)
         }
    }
    return (
        <div>
            <Navbar/>
            <main className="auth-shell">
                <section className="auth-panel">
                    <p className="eyebrow">Start reading</p>
                    <h1>Create a normal user account</h1>
                    <form onSubmit={handlesubmit} className="form-stack">
                        <label>
                            Username
                            <input value={form.username} placeholder="Your name" onChange={(e)=>setForm({...form,username:e.target.value})} required/>
                        </label>
                        <label>
                            Email
                            <input type="email" value={form.email} placeholder="you@example.com" onChange={(e)=>setForm({...form,email:e.target.value})} required/>
                        </label>
                        <label>
                            Password
                            <input type="password" value={form.password} placeholder="Choose a password" onChange={(e)=>setForm({...form,password:e.target.value})} required/>
                        </label>
                        {error && <p className="status-message error">{error}</p>}
                        <button className="primary-action" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
                    </form>
                    <p className="auth-note">Already have an account? <Link href="/login">Login</Link></p>
                </section>
            </main>
        </div>
    )
}
