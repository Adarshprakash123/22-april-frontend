"use Client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar(){
    const router=useRouter();

    const user=typeof window!=="undefined" ? JSON.parse(localStorage.getItem("user")):null

    const logout=()=>{
        localStorage.clear();
        router.push("/login")
    }

    return(
        <nav>
          <Link href="/">Home</Link>
          {
            user ? (
                <>
                  <span>{user.username}</span>
                  <button onClick={logout}>Logout</button>
                </>
            ):(
                <>
                   <Link href="/login">Login</Link>
                   <Link href="/register">Register</Link>
                </>
            )
          }
        </nav>
    )
}