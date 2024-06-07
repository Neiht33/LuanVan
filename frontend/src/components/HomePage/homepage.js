import React from 'react';
import './homepage.css'
import { Carousel, Typography, Button} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import CardMain from '../Card/Card'
import img from '../../img/cloud1.png'
import img2 from '../../img/cloud2.png'
import img3 from '../../img/homepage.png'
import img4 from '../../img/cloud3.png'
import img5 from '../../img/mbti.jpg'

export function HomePage() {

  return (
    <div className="HomePage">
      <div className='introduce mb-12 shadow-inner'>
        <Carousel autoplay={true} autoplayDelay={3000} loop={true} prevArrow={false} nextArrow={false} className=" shadow-inner" >
          <div className="relative h-full w-full">
            <img
              src="https://images.pexels.com/photos/7105539/pexels-photo-7105539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-full w-full">
            <img
              src="https://images.pexels.com/photos/5435599/pexels-photo-5435599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-full w-full">
            <img
              src="https://images.pexels.com/photos/4484853/pexels-photo-4484853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </div>
        </Carousel>
        <div className="absolute inset-0 grid place-items-center bg-black/35 slide inset-x-0 inset-y-0">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Sky World
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Providing all quality, diverse and beautiful products from the world's leading prestigious brands. Help your baby entertain anytime, anywhere, be creative, eager to learn and develop themselves.
              </Typography>
              <div className="flex justify-center gap-2">
                <Link to={'/Product'}>
                  <Button className='explore-btn' size="lg" color="white" >
                    Khám Phá Ngay
                  </Button>
                </Link>
              </div>
            </div>
        </div>
      </div>
      <h1 className='hotProduct-title text-white'>SẢN PHẨM NỔI BẬT</h1>
      <div className='px-32 py-12' style={{position: 'relative', overflow:'hidden'}}>
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
            <div className='GrapperOne' style={{zIndex: '1'}}>
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
            <div className='GrapperThree' style={{zIndex: '1'}}>
              <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="gallery-photo"
              />
            </div>
          </div>
          <div className="grid gap-4 ">
            <div className='GrapperOne' style={{zIndex: '1'}}>
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
        <div className='cloudBackground'>
          <img src={img} alt='Mây'/>
        </div>
        <div className='cloudBackground2'>
          <img src={img2} alt='Mây'/>
        </div>
        <div className='cloudBackground3'>
          <img src={img4} alt='Mây'/>
        </div>
      </div>
      <div className='introduce2 bg-white'>
        <div className='introduce-title'>Discover <br/> the potential<br/> within</div>
        <img src={img3}/>
      </div>
      <h1 className='hotProduct-title mb-5 text-white py-5 '>DANH MỤC ĐỒ CHƠI</h1>
      <CardMain/>
      {/* <div className='introduce3 w-full bg-white my-5 over flex justify-end'>
        <img className='introduce3-img' src={img5} alt='img'/>
      </div> */}
    </div>
  );
}
