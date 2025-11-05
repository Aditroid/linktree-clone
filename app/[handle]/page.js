import Link from "next/link"
import clientPromise from "@/lib/db"
import { notFound } from "next/navigation";
import ProfileImage from "@/app/components/ProfileImage";

export const revalidate = 0; // Disable caching for dynamic data

export default async function Page({ params }) {
    const handle = (await params).handle;
    
    try {
        const client = await clientPromise;
        const db = client.db("linktree");
        const collection = db.collection("link");

        const item = await collection.findOne({'body.handle': handle});
        if (!item) {
            return notFound();
        }
    } catch (error) {
        console.error('Database error:', error);
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f0f7f4] to-[#e0f0e9] py-12 px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <img src="/linktree.png" alt="Linktree Logo" className="h-10 mx-auto mb-8" />
                
                {/* Profile Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-8 transform transition-all duration-300 hover:shadow-2xl">
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                            <ProfileImage 
                                src={item.body.pic}
                                alt="Profile"
                                className="relative rounded-full h-40 w-40 object-cover border-4 border-white shadow-lg"
                            />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-gray-800">@{item.body.handle}</h1>
                        {item.body.desc && (
                            <p className="mt-2 text-gray-600 text-lg">{item.body.desc}</p>
                        )}
                    </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4 max-w-md mx-auto">
                    {item.body.links && item.body.links.map((linkItem, index) => (
                        <Link 
                            key={index} 
                            href={linkItem.link.startsWith('http') ? linkItem.link : `https://${linkItem.link}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-lg font-medium text-gray-800 hover:text-purple-600 transition-all duration-200 transform hover:-translate-y-1 shadow-sm hover:shadow-md items-center justify-center space-x-2"
                        >
                            <span>{linkItem.linktext}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    ))}

                    {/* Create Your Own Button */}
                    <Link 
                        href="/generate" 
                        className="block mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 items-center justify-center space-x-2"
                    >
                        <span>Create Your Own Linktree</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-500 text-sm">
                <p>Made with ❤️ using Linktree Clone</p>
            </footer>
        </div>
    );
}