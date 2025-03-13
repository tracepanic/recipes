import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// Get a single category by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400, statusText: "Bad Request" },
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const category = await db
      .collection("categories")
      .findOne({ _id: new ObjectId(id) });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(category, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("CATEGORY_GET: ", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}

// Update category by id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400, statusText: "Bad Request" },
      );
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400, statusText: "Bad Request" },
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const res = await db.collection("categories").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!res) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(res, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("CATEGORY_PUT: ", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}

// Delete category by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400, statusText: "Bad Request" },
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("categories")
      .findOneAndDelete({ _id: new ObjectId(id) });

    if (!res) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200, statusText: "OK" },
    );
  } catch (error) {
    console.log("CATEGORY_DELETE: ", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
