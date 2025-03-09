import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const RecipeItem = ({ recipe }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
        
        {/* Recipe Title */}
        <h1 className="text-xl font-semibold mb-2">{recipe.recipeName}</h1>
        
        {/* Recipe Description */}
        <p className="text-gray-700 mb-2">{recipe.instructions}</p>
        
        {/* Recipe Image */}
        <img
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            className="w-full h-auto rounded-md"
        />
        
        {/* Cooking Time */}
        <p className="text-gray-700 mt-2">
            Cooking Time: {recipe.cookingTime} minutes
        </p>
        
        {/* Operations */}
        <div className='flex justify-end gap-4 p-5'>
            <Link to={`/recipe/details/${recipe._id}`}>
              <BsInfoCircle className='text-2xl text-green-800' />
            </Link>
            <Link to={`/recipe/edit/${recipe._id}`}>
              <AiOutlineEdit className='text-2xl text-yellow-600' />
            </Link>
            <Link to={`/recipe/delete/${recipe._id}`}>
              <MdOutlineDelete className='text-2xl text-red-600' />
            </Link>
        </div>
    </div>
  );
};

export default RecipeItem;
