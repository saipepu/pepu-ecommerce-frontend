import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './AdminPanel/SigninPages/signup';
import SignIn from './AdminPanel/SigninPages/signin';
import Dashboard from './AdminPanel/DashboardPage.js/dashboard';
import Category from './AdminPanel/DashboardPage.js/CategoryPages/category';
import Product from './AdminPanel/DashboardPage.js/ProductPage.js/product';
import CreateCategoryPage from './AdminPanel/DashboardPage.js/CategoryPages/createCategory';
import CreateProductPage from './AdminPanel/DashboardPage.js/ProductPage.js/createProduct';
import LandingPage from './CustomerPages/LandingPage';
import ProductPage from './CustomerPages/ProductPage';

// import { Button, MantineProvider, Text, TextInput, Group, Container, Center } from '@mantine/core'
// import { useForm } from '@mantine/form'
// import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const App = () => {

  return (
    <>
    <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
        <Route path="/" exact element={<SignUp />} />
        <Route path="/admin/signin" exact element={<SignIn />} />
        <Route path="/admin/dashboard" exact element={<Dashboard />} />
        <Route path="/admin/category" exact element={<Category />} />
        <Route path="/admin/category/create" exact element={<CreateCategoryPage />} />
        <Route path="/admin/product" exact element={<Product />} />
        <Route path="/admin/product/create" exact element={<CreateProductPage />} />
        <Route path="/home" exact element={<LandingPage />} />
        <Route path="product/:id" exact element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;