"use client"
import API from "../../lib/api"
import { useParams } from "next/navigation"
import Navbar from "../../consponents/Navbar"
import { useEffect, useState } from "react";

export default function PostDetail(){
    const {id}=useParams();
    const [post,setPost]=useState(null);

    useEffect(()=>{
        API.get(`/posts/${id}`).then((res)=>setPost(res.data));
    },[id])

    if(!post) return <p>Loading....</p>

    return(
        <div>
             <Navbar/>
             <h1>{post.title}</h1>
             <div>jnfrkej</div>
             <p>{post.content}</p>
             <div>in-cintent</div>
        </div>
    )
}