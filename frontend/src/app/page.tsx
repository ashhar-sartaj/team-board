"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login")
  }
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Team Collaboration Board
      </h1>
      <button className="bg-white border-2 border-black text-black py-2 px-6 m-2 cursor-pointer" onClick={handleClick} type="button">
        Login
      </button>
    </main>
  );
}
