"use client"
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/Navbar"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const [text,setText] = useState("")
  const create = () => {
      router.push(`/generate?handle=${text}`)
  }
  return (
    <main>
      <Navbar/>
      <section className="bg-[#254f1a] h-[100vh] grid grid-cols-2 ">
        <div className="flex flex-col justify-center ms-[10vw] text-[#d2e823]">
          <p className="text-8xl mt-22 font-extrabold mb-5">Everything you are. In one, simple link in bio.</p>
          <p className="mb-11 text-xl font-semibold">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="flex flex-row items-center">
            <div className="flex items-center">
              <span className="bg-white h-[6vh] flex items-center px-4 rounded-l-xl border-r border-gray-200 text-gray-600 font-semibold">linktr.ee/</span>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="your handle"
                className="text-[#676b5f] h-[6vh] w-[12vw] bg-white rounded-r-xl font-semibold py-[19px] px-[16px]"
              />
            </div>
            <button onClick={()=>create()} className="bg-[#e9c0e9] shadow-2xl text-black font-semibold rounded-full w-auto min-w-[13vw] h-[6vh] px-6 ml-4 hover:cursor-pointer flex items-center justify-center whitespace-nowrap">
              Claim Your LinkTree
            </button>
          </div>
        </div>
        <div className="mt-70">
        <div className="ms-15">
          <ImageSlider/>
        </div>
        </div>
      </section>
      <section className="bg-[#780217] h-[100vh] grid grid-cols-2">
          <div className="flex flex-col justify-center ms-[10vw] text-[#e9c0e9]">
            <p className="text-6xl mt-22 font-extrabold mb-5">Share your Linktree from your Instagram, TikTok, Twitter and other bios</p>
            <p className="mb-11 text-xl font-semibold">Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>
            <Link href={"/generate"} target="_blank" className="bg-[#e9c0e9] text-center p-4 text-black shadow-2xl font-bold rounded-full w-[11.2vw] h-[6vh] ps-[18px] pe-[20px]">
              Get Started for Free
            </Link>
          </div>
          <div className="mx-auto my-auto">
            <img src="/Home5.png" alt="" />
          </div>
      </section>
    </main>
  );
}
