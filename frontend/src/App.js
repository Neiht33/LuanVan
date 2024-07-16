import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/User/Nav/nav.js';
import { Footer } from './components/User/Footer/footer.js';
import { HomePage } from './components/User/HomePage/homepage';
import Product from './components/User/Product/Product.js';
import ProductDetail from './components/User/ProductDetail/productDetail.js';
import SignIn from './components/User/SignIn/signIn.js';
import Cart from './components/User/Cart/cart.js';
import SpeedDial from './components/User/SpeedDial/speedDial.js';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import Admin from './components/Admin/Homepage/homepage.js';

function App() {
  const [language, setLanguage] = React.useState(JSON.parse(window.localStorage.getItem('language')))
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false)

  const handleScroll = () => {
    if ((window.scrollY > window.innerHeight)) {
      setOpenSpeedDial(true)
    } else {
      setOpenSpeedDial(false)
    }
  }

  React.useEffect(() => {
    if (!window.localStorage.getItem('language')) {
      window.localStorage.setItem('language', '1')
    }

  }, [])

  React.useEffect(() => {
    window.addEventListener(
      "scroll",
      () => handleScroll(),
    );
  }, []);

  return (
    <div className="App">
      <Nav language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path='/' element={<HomePage language={language} />} />
        <Route path='/Product' element={<Product language={language} />} />
        <Route path='/ProductDetail' element={<ProductDetail language={language} />} />
        <Route path='/SignIn' element={<SignIn language={language} />} />
        <Route path='/Cart' element={<Cart language={language} />} />
      </Routes>
      <SpeedDial openSpeedDial={openSpeedDial} language={language} />
      <Footer />
    </div>
  );
}

export default App;
