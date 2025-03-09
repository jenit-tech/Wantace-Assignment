import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
