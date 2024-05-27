import React from 'react';
import './App.css';
import Nav from './components/Nav/nav';
import { Carousel, Typography, Button} from "@material-tailwind/react";
import CardMain from './components/Card/Card'
import { Footer } from './components/Footer/footer';
import { HomePage } from './components/HomePage/homepage';
import { Route, Routes } from 'react-router-dom';
import { Product } from './components/Product/Product';

function App() {

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Product' element={<Product/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
