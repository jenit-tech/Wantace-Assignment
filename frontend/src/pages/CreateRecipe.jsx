import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveRecipe = () => {
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('cookingTime', cookingTime);
    formData.append('image', image);

    setLoading(true);
    axios
      .post('http://localhost:5555/recipe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Recipe Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating recipe', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Recipe</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        {/* Recipe Name */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Recipe Name</label>
          <input
            type='text'
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        {/* Ingredients */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-24'
          />
        </div>

        {/* Instructions */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-24'
          />
        </div>

        {/* Cooking Time */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Cooking Time (minutes)</label>
          <input
            type='number'
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        {/* Recipe Image Upload */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Upload Image</label>
          <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
       
        {/* Save Button */}
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveRecipe}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateRecipe;
