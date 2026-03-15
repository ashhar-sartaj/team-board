"use client"

import { useState } from "react"
import api from "@/services/api"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e:any) => {

    e.preventDefault()

    try{

      const res = await api.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data.token)

      router.push("/board")

    }catch(err){
      console.error(err)
      alert("Invalid credentials")
    }

  }

  return(

    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-3"
      >

        <h2 className="text-lg font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Login
        </button>
              <p className="text-sm text-center mt-3">
                  Not registered?{" "}
                  <Link href="/register" className="text-blue-500 underline">
                      register
                  </Link>
              </p>

      </form>

    </div>

  )
}
