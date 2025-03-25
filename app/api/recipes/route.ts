import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Get all recipes
export async function GET(): Promise<NextResponse> {
    try {
        const client = await clientPromise;
        const db = client.db();

        const recipes = await db.collection("recipes").find({}).toArray();

        return NextResponse.json(recipes, { status: 200, statusText: "OK" });
    } catch (error) {
        console.log("RECIPES_GET: ", error);
        return NextResponse.json(
            { error: "Failed to fetch recipes" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}

// Create a new recipe
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { name, categoryIds, smiley, ingredients, preparation } =
            await req.json();

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        if (!ingredients) {
            return NextResponse.json(
                { error: "Ingredients are required" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        if (!preparation) {
            return NextResponse.json(
                { error: "Preparation is required" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        if (!["good", "average", "bad"].includes(smiley)) {
            return NextResponse.json(
                { error: "Smiley must be good, average or bad" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        if (
            !Array.isArray(categoryIds) ||
            !categoryIds.every((id) => ObjectId.isValid(id))
        ) {
            return NextResponse.json(
                {
                    error: "Invalid category id",
                },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        const newRecipe = {
            name,
            categoryIds,
            smiley,
            ingredients,
            preparation,
        };
        const res = await db.collection("recipes").insertOne(newRecipe);

        return NextResponse.json(
            { _id: res.insertedId, ...res },
            { status: 201, statusText: "CREATED" }
        );
    } catch (error) {
        console.log("RECIPES_POST: ", error);
        return NextResponse.json(
            { error: "Failed to create recipe" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}
