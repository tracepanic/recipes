"use server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Get all recipes
export async function GET(): Promise<NextResponse> {
    try {
        const client = await clientPromise;
        const db = client.db("test");

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

const recipeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.enum(["breakfast", "lunch", "snack", "dinner"], {
        required_error: "Category is required",
        message: "Invalid category",
    }),
    smiley: z.enum(["good", "average", "bad"], {
        required_error: "smiley required",
        message: "smiley must be good or average or bad",
    }),
    ingredients: z
        .array(z.string().min(1, "Ingredient cannot be empty"))
        .min(1, "At least one ingredient is required"),
    preparation: z.string().min(1, "Preparation is required"),
});

// Create a new recipe
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { name, category, preparation, smiley, ingredients } =
            await req.json();
        const validationResult = recipeSchema.safeParse({
            name: name,
            category: category,
            preparation: preparation,
            smiley: smiley,
            ingredients: ingredients,
        });
        if (!validationResult.success) {
            // Grab the first error
            const firstError = validationResult.error.issues[0];

            const dynamicError = {
                field: firstError.path.join("."),
                message: firstError.message,
            };

            return NextResponse.json({ error: dynamicError }, { status: 400 });
        }
        // if (!name) {
        //     return NextResponse.json(
        //         { error: "Name is required" },
        //         { status: 400, statusText: "BAD REQUEST" }
        //     );
        // }

        // if (!ingredients) {
        //     return NextResponse.json(
        //         { error: "Ingredients are required" },
        //         { status: 400, statusText: "BAD REQUEST" }
        //     );
        // }

        // if (!preparation) {
        //     return NextResponse.json(
        //         { error: "Preparation is required" },
        //         { status: 400, statusText: "BAD REQUEST" }
        //     );
        // }

        // if (!["good", "average", "bad"].includes(smiley)) {
        //     return NextResponse.json(
        //         { error: "Smiley must be good, average or bad" },
        //         { status: 400, statusText: "BAD REQUEST" }
        //     );
        // }

        const client = await clientPromise;
        const db = client.db();

        const newRecipe = {
            name,
            category,
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
        return NextResponse.json(
            { error: "Failed to create recipe" },
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        );
    }
}
