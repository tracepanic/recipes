import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: {
            type: String,
            enum: ["breakfast", "lunch", "snack", "dinner"],
            required: true,
        },
        smiley: { type: String, enum: ["good", "average", "bad"] },
        ingredients: [{ type: String, required: true }],
        preparation: { type: String, required: true },
    },
    { timestamps: true }
);

const recipe = mongoose.model("Recipe", recipeSchema);

export default recipe;
