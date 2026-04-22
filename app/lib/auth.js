"use client"

import { useSyncExternalStore } from "react";

let lastRawUser = undefined;
let lastUser = null;

function readStoredUser(){
    if(typeof window==="undefined") return null;

    const rawUser=localStorage.getItem("user");
    if(rawUser===lastRawUser) return lastUser;

    lastRawUser=rawUser;
    try{
        lastUser=rawUser ? JSON.parse(rawUser) : null;
    }catch{
        lastUser=null;
    }
    return lastUser;
}

function subscribeToAuth(callback){
    window.addEventListener("storage", callback);
    window.addEventListener("auth-changed", callback);
    queueMicrotask(callback);

    return ()=>{
        window.removeEventListener("storage", callback);
        window.removeEventListener("auth-changed", callback);
    }
}

export function useStoredUser(){
    return useSyncExternalStore(subscribeToAuth, readStoredUser, ()=>null);
}

export function notifyAuthChanged(){
    if(typeof window!=="undefined"){
        window.dispatchEvent(new Event("auth-changed"));
    }
}

export function clearAuth(){
    if(typeof window!=="undefined"){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        notifyAuthChanged();
    }
}
