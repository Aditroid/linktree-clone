import clientPromise from "@/lib/db"

export const dynamic = 'force-dynamic' // Ensure this route is dynamic
export const revalidate = 0 // Disable caching

export async function POST(request) {
    try {
        const body = await request.json()
        
        if (!body || !body.handle) {
            return Response.json(
                { success: false, error: true, message: "Invalid request body" },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db("linktree")
        const collection = db.collection("link")
        
        // Check if handle already exists
        const existingDoc = await collection.findOne({ 'body.handle': body.handle })

        if (existingDoc) {
            return Response.json(
                { success: false, error: true, message: "Handle already exists" },
                { status: 409 } // Conflict
            )
        }

        // Insert new document
        const result = await collection.insertOne({ body })

        return Response.json({
            success: true,
            error: false,
            message: "Your Linktree has been created successfully",
            result: { insertedId: result.insertedId }
        })

    } catch (error) {
        console.error('API Error:', error)
        return Response.json(
            { success: false, error: true, message: "Internal server error" },
            { status: 500 }
        )
    }
}