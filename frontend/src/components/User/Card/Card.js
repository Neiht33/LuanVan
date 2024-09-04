import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  CardFooter,
  Button
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Example({ language }) {

  const [category, setCategory] = useState([])

  useEffect(() => {
    getApiCategory()
  }, [])

  const getApiCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/category`);
      const data = await response.json();
      if (data) {
        setCategory(data)
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  }

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0
    });
  }

  function removeVietnameseAccents(str) {
    if (str) {
      let withoutAccents = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      // Thay thế khoảng trắng bằng dấu gạch ngang
      return withoutAccents.replace(/\s+/g, '-');
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear", // Đảm bảo rằng cssEase được đặt thành "linear"
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <Slider {...settings} style={{ margin: '40px' }} className="overflow-hidden">
      {category.map((category, index) => (
        <div key={index}>
          <Link to={`http://localhost:3000/Product/${removeVietnameseAccents(category.name)}-${category.id}`} onClick={() => handleScrollUp()} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className="max-w-96 h-96">
              <CardHeader shadow={false} floated={false} className="h-96 w-[352px]">
                <img
                  src={`http://localhost:8080/images/${category.img}`}
                  alt="card-image"
                  className="h-full w-full"
                />
              </CardHeader>
              <CardFooter className="pt-0 ">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  <span className="more-btn">{category.name}</span>
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))
      }
    </Slider >
  );
}