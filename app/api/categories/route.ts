import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Get all categories
export async function GET(): Promise<NextResponse> {
    try {
        const client = await clientPromise;
        const db = client.db();

        const categories = await db.collection("categories").find({}).toArray();

        return NextResponse.json(categories, { status: 200, statusText: "OK" });
    } catch (error) {
        console.log("CATEGORIES_GET: ", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}

// Create a new category
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        const newCategory = { name };

        const res = await db.collection("categories").insertOne(newCategory);

        return NextResponse.json(
            { _id: res.insertedId, ...res },
            { status: 201, statusText: "CREATED" }
        );
    } catch (error) {
        console.log("CATEGORIES_POST: ", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}
