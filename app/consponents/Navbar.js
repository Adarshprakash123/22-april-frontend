"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { clearAuth, useStoredUser } from "../lib/auth"

export default function Navbar(){
    const router=useRouter();
    const user=useStoredUser();

    const logout=()=>{
        clearAuth();
        router.push("/login")
    }

    return(
        <nav className="site-nav">
          <Link href="/" className="brand">StoryBoard</Link>
          <div className="nav-links">
          <Link href="/">Home</Link>
          {
            user ? (
                <>
                  {user.isAdmin && <Link href="/admin/posts">Create</Link>}
                  {user.isAdmin && <Link href="/admin/dashboard">Admin</Link>}
                  <span className="nav-user">{user.username}</span>
                  <button className="secondary-action nav-logout" onClick={logout}>Logout</button>
                </>
            ):(
                <>
                   <Link href="/login">Login</Link>
                   <Link href="/register">Register</Link>
                </>
            )
          }
          </div>
        </nav>
    )
}
