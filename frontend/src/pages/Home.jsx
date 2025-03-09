import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import RecipeTable from '../components/home/RecipeTable'; // ✅ Updated import
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  const [recipe, setRecipe] = useState([]); // ✅ Changed 'recipe' to 'recipes'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/recipe')
      .then((response) => {
        console.log("Fetched recipes:", response.data.data); // ✅ Debugging
        setRecipe(response.data.data); // ✅ Ensure response structure is correct
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Recipe List</h1>
          <Link to='/recipe/create'> {/* ✅ Fixed the link */}
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-3xl font-semibold mb-4">All Recipes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <Spinner />
            ) :(
              recipe.map((recipe) => (
                <RecipeTable key={recipe._id} recipe={recipe} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
