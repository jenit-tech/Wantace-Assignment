import express from 'express';
import { Recipe } from '../models/recipeModel.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new recipe with image upload
router.post('/', upload.single('image'), async (request, response) => {
  try {
    if (
      !request.body.recipeName ||
      !request.body.ingredients ||
      !request.body.instructions ||
      !request.body.cookingTime ||
      !request.file
    ) {
      return response.status(400).send({
        message: 'Send all required fields: recipeName, ingredients, instructions, cookingTime, and an image',
      });
    }

    const newRecipe = {
      recipeName: request.body.recipeName,
      ingredients: request.body.ingredients,
      instructions: request.body.instructions,
      cookingTime: request.body.cookingTime,
      imageUrl: `/uploads/${request.file.filename}`,
    };

    const recipe = await Recipe.create(newRecipe);
    return response.status(201).send(recipe);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all recipes
router.get('/', async (request, response) => {
  try {
    const recipes = await Recipe.find({});
    return response.status(200).json({
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



// Get a single recipe by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return response.status(404).json({ message: 'Recipe not found' });
    }
    return response.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update a recipe by ID
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.recipeName ||
      !request.body.ingredients ||
      !request.body.instructions ||
      !request.body.cookingTime ||
      !request.body.imageUrl
    ) {
      return response.status(400).send({
        message: 'Send all required fields: recipeName, ingredients, instructions, cookingTime, imageUrl',
      });
    }

    const { id } = request.params;
    const result = await Recipe.findByIdAndUpdate(id, request.body, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    return response.status(200).send({ message: 'Recipe updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a recipe by ID
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Recipe.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    return response.status(200).send({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
