import React, { useEffect } from "react";
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

  useEffect(() => {
    const moreBtn = document.querySelectorAll('.more-btn')
    if (language == 1) {
      moreBtn.forEach((item) => {
        item.textContent = 'Xem thêm'
      },)
    } else {
      moreBtn.forEach((item) => {
        item.textContent = 'More'
      })
    }
  }, [language])

  const cardData = [
    {
      link: '/mbti/mbti/1',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/istj.png",
      title: "ISTJ - Người Trách Nhiệm",
      content: "Người tổ chức có trách nhiệm, biết sắp xếp trật tự",
    },
    {
      link: '/mbti/mbti/2',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/isfp.png",
      title: "ISFP - Người Nghệ Sĩ",
      content: "Đam mê và trân trọng thực tại, biết lắng nghe và quan tâm",
    },
    {
      link: '/mbti/mbti/3',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/infp.png",
      title: "INFP - Người Lý Tưởng Hoá",
      content: "Giàu trí tưởng tượng, đề cao giá trị và niềm tin của bản thân",
    },
    {
      link: '/mbti/mbti/4',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/intj.png",
      title: "INTJ -  Nhà Khoa Học",
      content: "Phân tích - giải quyết vấn đề hiệu quả, có năng khiếu với cải thiện hệ thống và quy trình",
    },
  ];

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <Slider {...settings} style={{ margin: '40px' }} >
      {cardData.map((card, index) => (
        <div key={index}>
          <Link to={card.link} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className="w-96 h-96">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardFooter className="pt-0 ">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  <span className="more-btn">Xem thêm</span>
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </Slider>
  );
}