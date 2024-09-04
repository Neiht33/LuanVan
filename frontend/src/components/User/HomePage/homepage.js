import React, { useEffect, useLayoutEffect, useState } from 'react';
import './homepage.css'
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import CardMain from '../Card/Card.js'
import img1 from '../../../img/homepage.png'
import img3 from '../../../img/bearbrick.png'

export function HomePage({ language }) {

  const [productDiscount, setProductDiscount] = useState([])

  const handleScrollType = () => {
    const typingPosition = document.querySelector('.introduce2')
    const addtyping = document.querySelector('.introduce-title')
    if (typingPosition && (typingPosition.getBoundingClientRect().top <= window.innerHeight / 2)) {
      addtyping.classList.add('typing-text')
    } else
      if (typingPosition && (typingPosition.getBoundingClientRect().top > window.innerHeight / 2)) {
        addtyping.classList.remove('typing-text')
      }
  }

  useLayoutEffect(() => {
    // window.addEventListener(
    //   "scroll",
    //   () => handleScrollType(),
    // );

    getApiProductDiscount()
  }, []);

  function removeVietnameseAccents(str) {
    if (str) {
      let withoutAccents = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      // Thay thế khoảng trắng bằng dấu gạch ngang
      return withoutAccents.replace(/\s+/g, '-');
    }
  }

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0
    });
  }

  const getApiProductDiscount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/productDiscount`);
      const data = await response.json();
      if (data) {
        setProductDiscount(data);
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  }

  return (
    <div className="HomePage">
      <div className='introduce mb-12 mt-4 h-[70vh]'>
        <div className='md:mr-[40px] mr-[20px] w-11/12'>
          <Typography className='introduce_title page-title text-start xl:text-8xl sm:min-h-[100px] font-semibold lg:text-7xl md:text-6xl text-[30px]'>
            {language == 1 ? 'Đồ chơi chính hãng' : 'Genuine and high'} <br /> {language == 1 ? 'chất lượng cao' : 'quality toys'}
          </Typography>
          <div className='md:text-[16px] text-[10px] text-left sm:my-8 my-2'>
            {language == 1 ? 'Cung cấp tất cả các sản phẩm chất lượng, đa dạng, đẹp mắt' : "Providing all quality, diverse and beautiful products from the world's"} <br /> {language == 1 ? 'từ các nước trên thế giới thương hiệu uy tín hàng đầu. Giúp bạn giải trí mọi' : 'leading prestigious brands. Help your baby entertain anytime, anywhere, be'} <br />{language == 1 ? 'lúc, mọi nơi, trở nên sáng tạo hơn, tìm tòi hơn và phát triển bản thân hơn.' : 'creative, eager to learn and develop themselves.'}
          </div>
          <Link to={'/Product'}>
            <Button className='explore-btn sm:w-[210px] sm:h-[66px] w-[110px] h-[40px] sm:text-[20px] sm:uppercase normal-case text-[10px] rounded-none float-left flex justify-center items-center' size="lg" color="white" >
              <span className=''>{language == 1 ? 'Khám Phá Ngay' : 'Explore'}</span>
            </Button>
          </Link>
        </div>
        <div className='sm:ml-[80px] ml-[30px]' style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={img3} alt='anh' />
        </div>
      </div>
      <div className='breakPage'>
        <h1 className='hotProduct-title my-10'>{language == 1 ? 'SẢN PHẨM NỔI BẬT' : 'HOT PRODUCTS'}</h1>
        <div className='xl:px-48 xl:py-24 lg:px-12 lg:py-12 sm:px-12 sm:py-12'>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="grid gap-6 z-10">
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[0].name)}-${productDiscount[0].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperOne h-full bg-white flex items-center p-2 relative rounded-xl shadow-md'>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center "
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[0].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]' >
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[0].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[1].name)}-${productDiscount[1].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperThree h-full bg-white flex items-center p-2 relative rounded-xl shadow-md'>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[1].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[1].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid gap-6">
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[2].name)}-${productDiscount[2].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperOne h-full bg-white flex items-center p-2 relative rounded-xl shadow-md' style={{ zIndex: '1' }}>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[2].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[2].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[3].name)}-${productDiscount[3].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperTwo h-full bg-white flex items-center p-2 relative rounded-xl shadow-md z-10'>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center "
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[3].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[3].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid gap-6 ">
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[4].name)}-${productDiscount[4].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperOne h-full bg-white flex items-center p-2 relative rounded-xl shadow-md z-10'>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[4].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[4].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[5].name)}-${productDiscount[5].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperTwo h-full bg-white flex items-center p-2 relative rounded-xl shadow-md z-10'>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center "
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[5].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[5].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[6].name)}-${productDiscount[6].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperThree h-full bg-white flex items-center p-2 relative rounded-xl shadow-md' style={{ zIndex: '1' }}>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[6].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[6].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid gap-6 ">
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[7].name)}-${productDiscount[7].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperOne h-full bg-white flex items-center p-2 relative rounded-xl shadow-md' style={{ zIndex: '1' }}>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[7].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[7].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
              <Link to={productDiscount.length != 0 ? `/Product/Productdetail/${removeVietnameseAccents(productDiscount[8].name)}-${productDiscount[8].id}` : ''} onClick={() => handleScrollUp()}>
                <div className='GrapperTwo h-full bg-white flex items-center p-2 relative rounded-xl shadow-md z-10'>
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={productDiscount.length != 0 ? `http://localhost:8080/images/${productDiscount[8].img}` : ''}
                    alt="gallery-photo"
                  />
                  <div className='discount-logo  text-center flex justify-center items-center absolute w-[120px] h-[120px] top-[-30px] right-[-20px]'>
                    <div className='absolute text-white text-sm font-medium'>{language == 1 ? 'GIẢM GIÁ' : 'DISCOUNT'} <br /> <span className='text-2xl font-semibold'>{productDiscount.length != 0 ? productDiscount[8].discount : ''}%</span></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='introduce2 px-5 sm:flex sm:items-center sm:justify-between py-10 relative mt-8'>
        <div className='GrapperOne flex justify-center p-2 xl:w-[512px] xl:h-[512px] lg:w-[350px] lg:h-[350px] w-[250px] h-[250px]'>
          <img className='w-[full] h-[full]' src={img1} />
        </div>
        <div className='sm:pl-[84px] p-4 w-9/12'>
          <div className='mb-6 introduce-title text-white xl:text-[42px] lg:text-[32px] sm:text-[24px] text-[20px]'>
            {language == 1 ? 'Khám phá tiềm năng bên trong' : 'Discover the potential within'}
          </div>
          <div className='introduce-content text-white xl:text-[30px] lg:text-[22px]'>
            {language == 1 ? 'Chọn những sản phẩm phù hợp có thể giúp bộc lộ tiềm năng, tài năng tiềm ẩn và phát huy tính sáng tạo.' : 'Choosing the right products can help reveal potential, hidden talents and promote creativity.'}
          </div>
        </div>
      </div>
      <div className='py-8'>
        <h1 className='hotProduct-title mb-5 py-20 '>{language == 1 ? 'DANH MỤC ĐỒ CHƠI' : 'TOY CATALOG'}</h1>
        <CardMain language={language} />
      </div>
    </div>
  );
}
