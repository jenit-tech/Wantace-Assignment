import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/recipe/${id}`)
      .then((response) => {
        setRecipeName(response.data.recipeName);
        setIngredients(response.data.ingredients);
        setInstructions(response.data.instructions);
        setCookingTime(response.data.cookingTime);
        setImageUrl(response.data.imageUrl);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.log(error);
      });
  }, [id]);

  const handleEditRecipe = () => {
    const data = {
      recipeName, ingredients, instructions, cookingTime, imageUrl
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/recipe/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Recipe Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing recipe', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Recipe</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Recipe Name</label>
          <input
            type='text'
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-24'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-24'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Cooking Time (minutes)</label>
          <input
            type='number'
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Image URL</label>
          <input
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditRecipe}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditRecipe;
