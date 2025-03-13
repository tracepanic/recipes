import mongoose from "mongoose";

const cookingTimeSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  },
  { timestamps: true },
);

const cookingTime = mongoose.model("CookingTime", cookingTimeSchema);

export default cookingTime;
