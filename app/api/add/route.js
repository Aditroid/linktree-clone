import clientPromise from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function POST(request) {
    try {
        const { links, handle, pic, desc } = await request.json()
        
        if (!handle || !links || !Array.isArray(links) || links.length === 0) {
            return Response.json(
                { success: false, message: "Handle and at least one link are required" },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db("linktree")
        const collection = db.collection("profiles")
        
        // Check if handle already exists
        const existingProfile = await collection.findOne({ handle })

        if (existingProfile) {
            return Response.json(
                { success: false, message: "This handle is already taken" },
                { status: 409 }
            )
        }

        // Prepare the document to be saved
        const profileData = {
            handle,
            links: links.filter(link => link.link && link.linktext), // Only save links with both URL and text
            pic: pic || "",
            desc: desc || "",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        // Insert the new profile
        const result = await collection.insertOne(profileData)

        if (!result.acknowledged) {
            throw new Error("Failed to save profile")
        }

        return Response.json({
            success: true,
            message: "Profile created successfully!",
            data: {
                handle,
                _id: result.insertedId
            }
        })

    } catch (error) {
        console.error('API Error:', error)
        return Response.json(
            { 
                success: false, 
                message: error.message || "An error occurred while creating your profile",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        )
    }
}