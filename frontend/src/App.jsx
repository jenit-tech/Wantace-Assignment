import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import ShowRecipe from './pages/ShowRecipe';
import EditRecipe from './pages/EditRecipe';
import DeleteRecipe from './pages/DeleteRecipe';
import CreateRecipe from './pages/CreateRecipe';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/recipe/create' element={<CreateRecipe />} />
      <Route path='/recipe/details/:id' element={<ShowRecipe />} />
      <Route path='/recipe/edit/:id' element={<EditRecipe />} />
      <Route path='/recipe/delete/:id' element={<DeleteRecipe />} />
    </Routes>
  );
};

export default App;
