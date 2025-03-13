import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    smiley: { type: String, enum: ["good", "average", "bad"] },
    ingredients: [{ type: String, required: true }],
    preparation: { type: String, required: true },
  },
  { timestamps: true },
);

const recipe = mongoose.model("Recipe", recipeSchema);

export default recipe;
