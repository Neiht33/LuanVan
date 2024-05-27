import React from "react";
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

export default function Example() {
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
    {
      link: '/mbti/mbti/5',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/isfj.png",
      title: "ISFJ - Người Nuôi Dưỡng",
      content: "Trung thành, sẵn sàng hi sinh vì người khác",
    },
    {
      link: '/mbti/mbti/6',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/istp.png",
      title: "ISTP - Nhà Kỹ Thuật",
      content: "Tư duy nhanh nhạy, quan sát tốt, phát hiện và giải quyết vấn đề nhanh gọn",
    },
    {
      link: '/mbti/mbti/7',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/infj.png",
      title: "ISFJ - Người Che Chở",
      content: "Nuôi dưỡng những lý tưởng đúng đắn, cầu toàn, coi trọng sự toàn diện và đề cao tính chính trực",
    },
    {
      link: '/mbti/mbti/8',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/intp.png",
      title: "INTP - Nhà Tư Duy",
      content: "Thông thái, triết lý, chỉ tin vào logic",
    },
    {
      link: '/mbti/mbti/9',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/enfj.png",
      title: "ENFJ - Người Cho Đi",
      content: "Lý tưởng hóa, có sức ảnh hưởng lớn, mưu cầu những điều tốt nhất cho tập thể",
    },
    {
      link: '/mbti/mbti/10',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/entj.png",
      title: "ENTJ - Nhà Điều Hành",
      content: "Kỹ năng lãnh đạo xuất sắc, lấy thay đổi làm động lực",
    },
    {
      link: '/mbti/mbti/11',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/esfj.png",
      title: "ESFJ - Người Quan Tâm",
      content: "Tận tụy, thích giúp đỡ mọi người xung quanh",
    },
    {
      link: '/mbti/mbti/12',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/estj.png",
      title: "ESTJ - Người Giám Hộ",
      content: "Theo đuổi chủ nghĩa làm việc siêng năng, tận tâm và nỗ lực hết mình để đạt được thành quả trong công việc",
    },
    {
      link: '/mbti/mbti/13',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/enfp.png",
      title: "ENFP - Người Truyền Cảm Hứng",
      content: "Lấy con người làm trung tâm sáng tạo, luôn tràn đầy năng lượng và cảm hứng",
    },
    {
      link: '/mbti/mbti/14',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/entp.png",
      title: "ENTP - Người Nhìn Xa",
      content: "Không ngừng sáng tạo - đổi mới, luôn tìm kiếm giải pháp cho các vấn đề thách thức",
    },
    {
      link: '/mbti/mbti/15',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/esfp.png",
      title: "ESFP - Người Trình Diễn",
      content: "Hoạt bát, yêu đời, đặt trải nghiệm là ưu tiên hàng đầu trong cuộc sống, có sức hút lớn với mọi người xung quanh",
    },
    {
      link: '/mbti/mbti/16',
      imageSrc: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/mbti/personalities/estp.png",
      title: "ESTP - Người Thực Thi",
      content: "Nhiệt tình, ưa cảm giác mạnh, sẵn sàng vượt qua ranh giới và lao vào hành động",
    }
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
    <Slider {...settings} style={{margin: '40px'}} >
      {cardData.map((card, index) => (
        <div key={index}>
          <Link to={card.link} style={{display: 'flex', justifyContent:'center'}}>
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
                Xem thêm
                </Button>
            </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </Slider>
  );
}