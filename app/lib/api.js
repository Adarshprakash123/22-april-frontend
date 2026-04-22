"use client"
import axios from "axios";

const API=axios.create({
    baseURL:"https://two2-april.onrender.com/api"
})

API.interceptors.request.use((req)=>{
    if(typeof window!=="window"){
        const token=localStorage.getItem("token")
        if(token) req.headers.Authorization=token;
    }
    return req;
})

export default API