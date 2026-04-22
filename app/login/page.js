"use client"
import API from "../lib/api"
import { useRouter } from "next/navigation"
import Navbar from "../consponents/Navbar"
import { useState } from "react"


export default function Login(){
    const [form,setForm]=useState({})
    const router=useRouter();

    const handlesubmit=async(e)=>{
         e.preventDefault();
         const res=await API.post("/auth/login",form)
         localStorage.setItem("token",res.data.token);
         localStorage.setItem("user",JSON.stringify(res.data.user))
    }
    return (
        <div>
            <Navbar/>
            <form onSubmit={handlesubmit}>
                <h2>Login</h2>
                <input placeholder="email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
                <input type="password" placeholder="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
                <button>Login</button>
            </form>
        </div>
    )
}