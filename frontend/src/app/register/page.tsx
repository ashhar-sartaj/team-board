
"use client"

import { useState } from "react"
import api from "@/services/api"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function Register() {

  const router = useRouter()

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e:any) => {

    e.preventDefault()

    try{

      await api.post("/auth/register",{
        username,
        email,
        password
      })

      alert("Registration successful")
      router.push("/login")

    }catch(err){
      console.error(err)
      alert("Registration failed")
    }

  }

  return(

    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-3"
      >

        <h2 className="text-lg font-bold">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Register
        </button>
              <p className="text-sm text-center mt-3">
                  Already registered?{" "}
                  <Link href="/login" className="text-blue-500 underline">
                      login
                  </Link>
              </p>

      </form>

    </div>

  )
}

