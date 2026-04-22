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
         await API.post("/auth/register",form);
         router.push("/login")
    }
    return (
        <div>
            <Navbar/>
            <form onSubmit={handlesubmit}>
                <h2>Register</h2>
                <input placeholder="username" onChange={(e)=>setForm({...form,username:e.target.value})}/>
                <input type="email" placeholder="email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
                 <input type="password" placeholder="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
                <button>register</button>
            </form>
        </div>
    )
}