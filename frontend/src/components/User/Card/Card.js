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
import axios from "axios";

export function CardCategory({ language }) {

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

  const handleAction = (accountID, objectID, type) => {
    var formSubmit = {
      accountID: accountID,
      objectID: objectID,
      type: type
    }

    axios.put(`http://localhost:8080/api/action`, formSubmit, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {

      })
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
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
    <Slider {...settings} style={{ margin: '40px' }} className="">
      {category.map((category, index) => (
        <div key={index}>
          <Link to={`http://localhost:3000/Product/${removeVietnameseAccents(category.name)}-${category.id}`} onClick={() => {
            handleScrollUp()
            if (window.localStorage.getItem('User')) {
              handleAction(JSON.parse(window.localStorage.getItem('User')).id, category.id, 2);
            }
          }} style={{ display: 'flex', justifyContent: 'center' }}>
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

export function CardHotProduct({ language }) {

  const [hotProduct, setHotProduct] = useState([])

  useEffect(() => {
    getApiHotProduct()
  }, [])

  const getApiHotProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/hotProduct`);
      const data = await response.json();
      if (data) {
        setHotProduct(data)
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  }

  const handleAction = (accountID, objectID, type) => {
    var formSubmit = {
      accountID: accountID,
      objectID: objectID,
      type: type
    }

    axios.put(`http://localhost:8080/api/action`, formSubmit, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {

      })
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
      });
  }

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0
    });
  }

  function formatNumber(number) {
    // Chuyển số thành chuỗi và đảo ngược chuỗi
    let reversedNumberString = String(number).split('').reverse().join('');
    let formattedNumber = '';

    // Thêm dấu chấm ngăn cách vào mỗi 3 ký tự
    for (let i = 0; i < reversedNumberString.length; i++) {
      if (i !== 0 && i % 3 === 0) {
        formattedNumber += '.';
      }
      formattedNumber += reversedNumberString[i];
    }

    // Đảo ngược lại chuỗi đã được định dạng
    return formattedNumber.split('').reverse().join('');
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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear", // Đảm bảo rằng cssEase được đặt thành "linear"
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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
    <Slider {...settings} style={{ margin: '40px' }} className="w-full">
      {hotProduct.map((product, index) => (
        <div key={index}>
          <Link to={`http://localhost:3000/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`} onClick={() => {
            handleScrollUp()
            if (window.localStorage.getItem('User')) {
              handleAction(JSON.parse(window.localStorage.getItem('User')).id, product.id, 1);
            }
          }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className="max-w-96 h-96">
              <CardHeader shadow={false} floated={false} className="h-96 w-[352px] flex justify-center shadow-lg">
                <img
                  src={`http://localhost:8080/images/${product.img}`}
                  alt="card-image"
                  className="h-full"
                />
              </CardHeader>
              <CardFooter className="p-4">
                <div className="">
                  <Typography color="blue-gray" className="text-gray-600 sm:text-[18px] text-[14px] text-start">
                    {product.name}
                  </Typography>
                  <div className="flex items-center">
                    {product.discount > 0 ? <div className="sm:flex sm:items-center">
                      <Typography color="red" className="font-semibold sm:mb-4 mt-2 sm:mr-3 mr-1 sm:text-[18px] text-[16px]" textGradient>
                        {formatNumber(Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)} đ
                      </Typography>
                      <Typography className="font-normal line-through sm:mb-4 sm:mt-2 text-gray-500 sm:text-[18px] text-[14px]" textGradient>
                        {formatNumber(product.price)} đ
                      </Typography>
                    </div> : <Typography color="red" className="font-semibold sm:mb-4 mt-2 sm:mr-3 mr-1 sm:text-[18px] text-[16px]" textGradient>
                      {formatNumber(product.price)} đ
                    </Typography>}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))
      }
    </Slider >
  );
}