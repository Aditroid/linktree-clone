import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";
export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("linktree")
    const collection = db.collection("link")

    const item = await collection.findOne({'body.handle':handle})
    if(!item){
        return notFound();
    }
    // const handle = (await params).handle
    // const item2 = {

    //     "_id": {
    //         "$oid": "67d00795ef66427fec6e8e1f"
    //     },
    //     "body": {
    //         "links": [
    //             {
    //                 "link": "www.facebook.com",
    //                 "linktext": "facebook"
    //             }
    //         ],
    //         "handle": "aditya",
    //         "pic": "https://images.unsplash.com/photo-1741207154948-66f7fa63c35a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
    //         "desc": "maine bainai hai"
    //     }

    // }
    return <>
        
        <img src="/linktree.png" alt="Logo" className="h-10 w-47 absolute top-10 left-15" />
        <div className="min-h-[100vh] bg-[#6f9e63]">
            <div className="photo flex flex-col items-center">
                <img src={item.body.pic} alt="Profile Picture" className="border-3 border-[#276617] rounded-full h-53 w-53 mt-10" />
                <p className="font-bold text-black text-2xl mt-2">@{item.body.handle}</p>
                <p className="font-bold text-black text-2xl mt-1">{item.body.desc}</p>
            </div>
            <div className="links flex flex-col items-center mt-8">
                {item.body.links.map((linkItem, index) => {
                    return <Link key={index} href={linkItem.link} target="_blank" className="font-bold text-white text-2xl mt-3 border-2 border-[#1f2c1b] bg-[#4a6b41] w-[30vw] text-center p-3 rounded-full hover:scale-110">
                        {linkItem.linktext}
                    </Link>
                })}
        <Link href="/generate" target="_blank" className="font-bold p-4 text-2xl mt-25 border-2 text-white border-[#1f2c1b] bg-[#4a6b41] text-center rounded-full hover:scale-110 ">Create your Own </Link>
            </div>
        </div>



    </>
}