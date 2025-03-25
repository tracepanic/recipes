import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// Get a single recipe by id
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid recipe id" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        const recipe = await db
            .collection("recipes")
            .findOne({ _id: new ObjectId(id) });

        if (!recipe) {
            return NextResponse.json(
                { error: "Recipe not found" },
                { status: 404, statusText: "NOT FOUND" }
            );
        }

        return NextResponse.json(recipe, { status: 200, statusText: "OK" });
    } catch (error) {
        console.log("RECIPE_GET: ", error);
        return NextResponse.json(
            { error: "Failed to fetch recipe" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}

// Update recipe by id
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid recipe id" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

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

        const res = await db
            .collection("recipes")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { categoryIds, smiley, ingredients, preparation } },
                { returnDocument: "after" }
            );

        if (!res) {
            return NextResponse.json(
                { error: "Recipe not found" },
                { status: 404, statusText: "NOT FOUND" }
            );
        }

        return NextResponse.json(res, { status: 200, statusText: "OK" });
    } catch (error) {
        console.log("RECIPE_PUT: ", error);
        return NextResponse.json(
            { error: "Failed to update recipe" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}

// Delete recipe by id
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid recipe id" },
                { status: 400, statusText: "BAD REQUEST" }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        const res = await db
            .collection("recipes")
            .findOneAndDelete({ _id: new ObjectId(id) });

        if (!res) {
            return NextResponse.json(
                { error: "Recipe not found" },
                { status: 404, statusText: "NOT FOUND" }
            );
        }

        return NextResponse.json(
            { message: "Recipe deleted successfully" },
            { status: 200, statusText: "OK" }
        );
    } catch (error) {
        console.log("RECIPE_DELETE: ", error);
        return NextResponse.json(
            { error: "Failed to delete recipe" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}
