import React, { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/User/Nav/nav.js';
import { Footer } from './components/User/Footer/footer.js';
import { HomePage } from './components/User/HomePage/homepage';
import Product from './components/User/Product/Product.js';
import ProductDetail from './components/User/ProductDetail/productDetail.js';
import SignIn from './components/User/SignIn/signIn.js';
import Cart from './components/User/Cart/cart.js';
import SpeedDial from './components/User/SpeedDial/speedDial.js';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import ProductByCategory from './components/User/ProductByCategory/productByCategory.js';
import Account from './components/User/Account/account.js';

function App() {
  const [language, setLanguage] = useState(JSON.parse(window.localStorage.getItem('language')))
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [cartDetail, setCartDetail] = useState([])

  useEffect(() => {
    if (!window.localStorage.getItem('language')) {
      window.localStorage.setItem('language', '1')
    }

    if (window.localStorage.getItem('User')) {
      getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
    }

  }, [])

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => handleScroll(),
    );
  }, []);

  const handleScroll = () => {
    if ((window.scrollY > window.innerHeight)) {
      setOpenSpeedDial(true)
    } else {
      setOpenSpeedDial(false)
    }
  }

  const getApiCartDetail = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${id}`);
      const data = await response.json();
      if (data) {
        setCartDetail(data)
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  }

  return (
    <div className="App">
      <Nav language={language} setLanguage={setLanguage} cartDetail={cartDetail} />
      <Routes>
        <Route path='/' element={<HomePage language={language} />} />
        <Route path='/Product' element={<Product language={language} getApiCartDetail={getApiCartDetail} />} />
        <Route path='/Product/:id' element={<ProductByCategory language={language} getApiCartDetail={getApiCartDetail} />} />
        <Route path='/Product/Productdetail/:id' element={<ProductDetail language={language} getApiCartDetail={getApiCartDetail} />} />
        <Route path='/SignIn' element={<SignIn language={language} />} />
        <Route path='/Account/*' element={<Account language={language} />} />
        <Route path='/Cart' element={<Cart language={language} cartDetail={cartDetail} setCartDetail={setCartDetail} getApiCartDetail={getApiCartDetail} />} />
      </Routes>
      <SpeedDial openSpeedDial={openSpeedDial} language={language} />
      <Footer />
    </div>
  );
}

export default App;
