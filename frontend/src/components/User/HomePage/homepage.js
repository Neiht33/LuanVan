import React from 'react';
import './homepage.css'
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import CardMain from '../Card/Card.js'
import img1 from '../../../img/homepage.png'
import img2 from '../../../img/mbti.jpg'
import img3 from '../../../img/bearbrick.png'
import { calc } from 'antd/es/theme/internal.js';

export function HomePage({ language }) {

  React.useEffect(() => {
    const introduceTitle = document.querySelector('.introduce_title')
    const introduceBenefit = document.querySelector('.introduce_benefit')
    const exploreBtn = document.querySelector('.explore-title')
    const hotProducts = document.querySelectorAll('.hotProduct-title')
    const introduceTitle1 = document.querySelector('.introduce-title')
    const introduceContent = document.querySelector('.introduce-content')
    if (language == 1) {
      introduceTitle.innerHTML = 'Đồ chơi chính hãng <br /> chất lượng cao'
      introduceBenefit.innerHTML = 'Cung cấp tất cả các sản phẩm chất lượng, đa dạng, đẹp mắt <br/> từ các nước trên thế giới thương hiệu uy tín hàng đầu. Giúp bạn giải trí mọi <br/> lúc, mọi nơi, trở nên sáng tạo hơn, tìm tòi hơn và phát triển bản thân hơn.'
      exploreBtn.textContent = 'Khám Phá Ngay'
      hotProducts[0].textContent = 'SẢN PHẨM NỔI BẬT'
      hotProducts[1].textContent = 'DANH MỤC ĐỒ CHƠI'
      introduceTitle1.textContent = 'Khám phá tiềm năng bên trong'
      introduceContent.textContent = 'Chọn những sản phẩm phù hợp có thể giúp bộc lộ tiềm năng, tài năng tiềm ẩn và phát huy tính sáng tạo.'
    } else {
      introduceTitle.innerHTML = 'Genuine and high <br /> quality toys'
      introduceBenefit.innerHTML = "Providing all quality, diverse and beautiful products from the world's <br /> leading prestigious brands. Help your baby entertain anytime, anywhere, be <br />creative, eager to learn and develop themselves."
      exploreBtn.textContent = 'Explore'
      hotProducts[0].textContent = 'HOT PRODUCTS'
      hotProducts[1].textContent = 'TOY CATALOG'
      introduceTitle1.textContent = 'Discover the potential within'
      introduceContent.textContent = 'Choosing the right products can help reveal potential, hidden talents and promote creativity.'
    }
  }, [language])

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

  React.useEffect(() => {
    window.addEventListener(
      "scroll",
      () => handleScrollType(),
    );
  }, []);

  return (
    <div className="HomePage">
      <div className='introduce mb-12'>
        <div style={{ marginRight: '80px' }}>
          <Typography className='introduce_title page-title text-start' variant="h1">
            Đồ chơi chính hãng <br /> chất lượng cao
          </Typography>
          <div className='introduce_benefit text-left my-8'>Providing all quality, diverse and beautiful products from the world's <br /> leading prestigious brands. Help your baby entertain anytime, anywhere, be <br />creative, eager to learn and develop themselves.</div>
          <Link to={'/Product'}>
            <Button className='explore-btn rounded-none float-left flex justify-center items-center' size="lg" color="white" >
              <span className='explore-title'>Khám Phá Ngay</span>
            </Button>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '80px' }}>
          <img src={img3} alt='anh' />
        </div>
      </div>
      <div className='breakPage min-h-screen'>
        <h1 className='hotProduct-title my-10'>SẢN PHẨM NỔI BẬT</h1>
        <div className='min-h-screen xl:px-32 xl:py-12 lg:px-12 lg:py-12 sm:px-12 sm:py-12'>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="grid gap-4 z-10">
              <div className='GrapperOne'>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center "
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className='GrapperThree'>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className='GrapperOne' style={{ zIndex: '1' }}>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div className='GrapperTwo z-10'>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center "
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4 ">
              <div className='GrapperOne z-10'>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div className='GrapperTwo z-10'>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center "
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className='GrapperThree' style={{ zIndex: '1' }}>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4 ">
              <div className='GrapperOne' style={{ zIndex: '1' }}>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div className='GrapperTwo z-10'>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='introduce2 px-5'>
        <img className='GrapperOne' src={img1} />
        <div className='pl-[84px]'>
          <div className='mb-6 introduce-title text-white'>
            Khám phá tiềm năng bên trong
          </div>
          <div className='introduce-content text-white'>
            Chọn những sản phẩm phù hợp có thể giúp bộc lộ tiềm năng, tài năng tiềm ẩn và phát huy tính sáng tạo.
          </div>
        </div>
      </div>
      <div className='min-h-screen'>
        <h1 className='hotProduct-title mb-5 py-20 '>DANH MỤC ĐỒ CHƠI</h1>
        <CardMain language={language} />
      </div>
      <div className='introduce3 w-full bg-white my-5 over flex justify-end'>
        <img className='introduce3-img' src={img2} alt='img' />
      </div>
    </div>
  );
}
