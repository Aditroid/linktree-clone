"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams } from 'next/navigation';

const Generate = () => {
    const searchParams = useSearchParams()
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }

    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            toast.success(result.message)
            setLinks([{link:"", linktext:""}])
            setpic("")
            sethandle("")
            setdesc("")
        }
        else {
            toast.error(result.message)
        }
    }
    return (
        <div className='min-h-[100vh] grid grid-cols-2 bg-[#ecd8fa]' >
                <img src="/linktree.png" alt="Logo" className="h-10 w-47 absolute top-10 left-15" />
            <div className='col1 flex flex-col ps-70'>
                <p className='text-6xl font-bold mt-50'>Create your LinkTree</p>
                <div className='flex flex-col mt-10' >
                    <p className='font-semibold mb-2 text-2xl'>Step 1 : Claim Your Handle</p>
                    <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} type="text" placeholder='Choose a Handle' className='mb-4 bg-white px-5  h-10 rounded-3xl focus:outline-[#512174] focus:outline-2 w-75' />
                    <p className='font-semibold mb-2 text-2xl'>Step 2 : Add Links</p>
                    {links && links.map((item, index) => {
                        return <div key={index} className='flex flex-row'>
                            <input value={item.linktext||""} onChange={e => { handleChange(index, item.link, e.target.value) }} type="text" placeholder='Enter Your Link Text' className='bg-white px-5 h-10 focus:outline-[#512174] focus:outline-2 rounded-3xl mb-3 me-2 w-132' />
                            <input value={item.link||""} onChange={e => { handleChange(index, e.target.value, item.linktext)}} type="text" placeholder='Enter Your URL' className='bg-white px-5 h-10 focus:outline-[#512174] focus:outline-2 rounded-3xl w-full' />
                        </div>
                    })}
                </div>
                <button onClick={() => addLink()} className='bg-[#512174] rounded-full text-white py-2 w-25 font-semibold'>
                    Add Link
                </button>
                <div>
                    <p className='font-semibold mb-2 text-2xl mt-4'>Step 3 : Add Your Profile Picture</p>
                    <input value={pic || ""} onChange={e => { setpic(e.target.value) }} type="text" placeholder='Enter Link to your Picture' className='bg-white px-5 h-10 focus:outline-[#512174] focus:outline-2 rounded-3xl mb-3 me-2 w-full' />
                    <input value={desc || ""} onChange={e=>{setdesc(e.target.value)}} className='bg-white px-5 h-10 focus:outline-[#512174] focus:outline-2 rounded-3xl mb-3 me-2 w-full' type="text" placeholder='Enter description' />
                </div>
                <button disabled={pic == "" || handle=="" || links[0].linktext == "" || links[0].link == ""} onClick={()=>{submitLinks()}} className='bg-[#512174] text-xl rounded-full text-white py-4 w-35 mt-7 font-semibold'>
                    Create
                </button>
            </div>
            <div className='col2 relative ms-70'>
                <Image src="/generate.png" alt="Linktree Logo" fill={true} priority />
                <ToastContainer />

            </div>
        </div>
    )
}

export default Generate