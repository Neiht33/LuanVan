import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './productDetail.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Typography, Button, Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardHeader,
    CardBody,
    Breadcrumbs,
} from '@material-tailwind/react';
import { Flex, InputNumber, ConfigProvider, Col, Row, notification, Space, Rate } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


export default function ProductDetail({ language, getApiCartDetail }) {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState("mota");
    const [product, setProduct] = useState({})
    const [productRelated, setProductRelated] = useState([])
    const [supportImg, setSupportImg] = useState([])
    const [active, setActive] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [feedback, setFeedback] = useState([]);
    const [displayImg, setDisplayImg] = useState(3)
    var [checkProductRelate, setCheckProductRelate] = useState(false)

    useLayoutEffect(() => {
        getApiProductByID(id.match(/[^-]*$/)[0])
        getApiProductFeedback(id.match(/[^-]*$/)[0])
    }, [id])

    useEffect(() => {
        document.querySelector('.product-description').innerHTML = product.description
    }, [product])

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api[type]({
            message: 'Đã thêm vào giỏ hàng',
            placement: 'top'
        });
    };

    const getApiProductByID = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/productdetail/${id}`);
            const data = await response.json();
            if (data) {
                setProduct(data[0]);
                setActive(`http://localhost:8080/images/${data[0].img}`)
                getApiProductSupport(data[0].id)
                getApiProductRelated(data[0].category)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductSupport = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/supportImg/${id}`);
            const data = await response.json();
            if (data) {
                if (data.length == 0 || data.length == 1) setDisplayImg(2)
                setSupportImg(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductFeedback = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rated/productID/${id}`);
            const data = await response.json();
            if (data) {
                setFeedback(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductRelated = async (idCategory) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/catalog/main?page=1&id=${idCategory}`);
            const data = await response.json();
            if (data) {
                var dataRelate
                if (data.findIndex(item => item.id == id.match(/[^-]*$/)[0]) <= 3) {
                    dataRelate = data.filter((item, index) => (item.id != id.match(/[^-]*$/)[0]) && (index < 5))
                } else {
                    dataRelate = data.filter((item, index) => index < 4)
                }
                setProductRelated(dataRelate);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
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

    const handleScrollUp = () => {
        window.scrollTo({
            top: 0
        });
    }

    const handleAddCart = (productID, quantity, total) => {
        const formSubmit = {
            productID: productID,
            quantity: quantity,
            total: total,
            accountID: JSON.parse(window.localStorage.getItem('User')).id
        }

        axios.put(`http://localhost:8080/api/cart`, formSubmit, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
                openNotification('success')
                console.log(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    }

    const settings = {
        dots: false,
        speed: 200,
        slidesToShow: displayImg,
        slidesToScroll: 1,
        cssEase: "linear", // Đảm bảo rằng cssEase được đặt thành "linear"
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: displayImg,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: displayImg,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: displayImg,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="w-full bg-white" >
                <Breadcrumbs style={{ backgroundColor: 'transparent' }}>
                    <Link to={'/'} className="opacity-60">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>
                    <Link to={'/Product'} className="opacity-60">
                        {language == 1 ? 'Tất cả sản phẩm' : 'All product'}
                    </Link>
                    <Link to={`#`} className="opacity-60">
                        {product.name}
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="ProductDetail">
                <div className='img-container relative p-8'>
                    <div className="grid gap-4">
                        <div className='bg-white rounded-lg p-4 flex justify-center items-center h-[580px] w-[692px]'>
                            <img
                                className="h-full rounded-lg object-center"
                                src={active}
                                alt=""
                            />
                        </div>
                        <div className="flex justify-center">
                            <Slider {...settings} className='flex justify-center' style={{ margin: '40px', width: '600px' }} >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className={`bg-white rounded-lg p-1 flex justify-center items-center h-[160px] w-[160px] cursor-pointer ${active != `http://localhost:8080/images/${product.img}` ? 'opacity-50' : ''}`}>
                                            <img
                                                onClick={() => setActive(`http://localhost:8080/images/${product.img}`)}
                                                src={`http://localhost:8080/images/${product.img}`}
                                                className="h-full rounded-lg object-center"
                                                alt="gallery-image"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {supportImg.map((item, index) => (
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                                            <div className={`bg-white rounded-lg p-1 flex justify-center items-center h-[160px] w-[160px] cursor-pointer ${active != `http://localhost:8080/images/${item.supportImg}` ? 'opacity-50' : ''}`}>
                                                <img
                                                    onClick={() => setActive(`http://localhost:8080/images/${item.supportImg}`)}
                                                    src={`http://localhost:8080/images/${item.supportImg}`}
                                                    className="h-full rounded-lg object-center"
                                                    alt="gallery-image"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className='img-container_absolute absolute'></div>
                </div>
                <div className='infomation-container rounded-tl-[200px]'>
                    <Typography className='mb-6 font-medium' variant="h2">{product.name}</Typography>
                    <div className='product-rate mb-6 flex items-center'>
                        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffeb0f" d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763z"></path></svg>
                        <span className='product-rate__score font-bold'>{feedback.length > 0 ? (feedback.reduce((total, value, index, par) => total + par[index].rate, 0) / feedback.length) : '0'}/5</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#d1d1d1" d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"></path></svg>
                        <span className='product-rate__view text-gray-500'>{feedback.length} Review</span>
                    </div>
                    <div className='product-info mb-6 text-gray-600'>
                        <div className='mb-2 text-black flex items-center text-gray-500'>
                            <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"></path></svg>
                            Hàng Chính Hãng
                        </div>
                        <div className='mb-2 text-black flex items-center text-gray-500'>
                            <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"></path></svg>
                            Miễn Phí Giao Hàng Toàn Quốc Đơn 500k
                        </div>
                        <div className='mb-2 text-black flex items-center text-gray-500'>
                            <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"></path></svg>
                            Kiểm Tra Khi Nhận Hàng Và Hoàn Trả Nếu Sản Phẩm Lỗi
                        </div>
                    </div>
                    <div className='product-price mb-6 font-bold text-2xl text-red-400 flex items-center'>
                        {formatNumber(Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)} đ
                        {product.discount > 0 ? <Typography variant="h5" color="red" className="font-normal line-through ml-4 text-gray-500" textGradient>
                            {formatNumber(product.price)} đ
                        </Typography> : ''}
                    </div>
                    <div className='my-6 flex items-center'>
                        <span className='mr-2'>Số lượng:</span>
                        <ConfigProvider
                            theme={{
                                components: {
                                    InputNumber: {
                                        activeBorderColor: '#000',
                                        hoverBorderColor: '#000',
                                        handleHoverColor: '#000'
                                    },
                                },
                            }}
                        >
                            <Flex vertical gap={12}>
                                <InputNumber onChange={setQuantity} min={1} max={product.wareHouse} defaultValue={1} mouseEnterDelay={0} />
                            </Flex>
                        </ConfigProvider>
                        <span className='ml-4 text-gray-500'>{product.wareHouse} {language == 1 ? 'sản phẩm có sẵn' : 'pieces availabel'}</span>
                    </div>
                    <div className="flex w-max gap-4">
                        <Button className='translate-add w-[170px]' variant="outlined" onClick={() => {
                            if (!window.localStorage.getItem('User')) {
                                window.location.href = 'http://localhost:3000/SignIn'
                            } else handleAddCart(product.id, quantity, quantity * (Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000))
                        }}>
                            {language == 1 ? 'THÊM VÀO GIỎ HÀNG' : 'ADD TO CART'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='ProductSupport bg-white pb-10 min-h-80 mb-6'>
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        <Tab
                            key='mota'
                            value='mota'
                            onClick={() => setActiveTab('mota')}
                            className={`py-4 ${activeTab === 'mota' ? "text-gray-900" : ""}`}
                        >
                            <span className='text-2xl translate-description'>{language == 1 ? 'Mô tả sản phẩm' : 'Product Description'}</span>
                        </Tab>
                        <Tab
                            key='danhgia'
                            value='danhgia'
                            onClick={() => setActiveTab('danhgia')}
                            className={`py-4 ${activeTab === 'danhgia' ? "text-gray-900" : ""}`}
                        >
                            <span className='text-2xl translate-rating'>{language == 1 ? 'Đánh giá' : 'Product Rating'} ({feedback.length})</span>
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel className='text-start product-description' key='mota' value='mota'>
                        </TabPanel>
                        <TabPanel key='danhgia' value='danhgia'>
                            {feedback.map((user, index) => (
                                <Card color="transparent" shadow={false} className="w-full">
                                    <CardHeader
                                        color="transparent"
                                        floated={false}
                                        shadow={false}
                                        className="mx-0 flex items-center gap-4 pt-0 mb-1"
                                    >
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <Typography variant="h6" color="blue-gray">
                                                    {user.name}
                                                </Typography>

                                            </div>
                                        </div>
                                    </CardHeader>
                                    <Rate disabled allowHalf defaultValue={user.rate} className='text-start mb-2' />
                                    <CardBody className="mb-6 p-0">
                                        <Typography className='text-start'>
                                            {user.comment}
                                        </Typography>
                                    </CardBody>
                                </Card>
                            ))}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
            <div className='product-related bg-white bg-opacity-0'>
                <Typography className='translate-related mb-6 relate-title' variant="h2">
                    {language == 1 ? 'Sản phẩm liên quan' : 'Related product'}
                </Typography>
                <Row className='pr-[58px]'>
                    {productRelated.map((product, index) => {
                        return (
                            <Col className="" xl={{ span: 5, offset: 1 }} sm={{ span: 7, offset: 1 }} xs={{ span: 12 }}>
                                <Link to={`/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`} onClick={() => handleScrollUp()}>
                                    <Card className="w-full relative" style={{ border: '3px solid black' }}>
                                        <CardHeader floated={false} className="h-[300px] p-4 flex">
                                            <img className="h-full m-auto" src={`http://localhost:8080/images/${product.img}`} alt="profile-picture" />
                                        </CardHeader>
                                        <CardBody className="p-4 text-start h-[182px]">
                                            <Typography variant="h7" color="blue-gray" className="mb-2 text-gray-600 product-name">
                                                {product.name}
                                            </Typography>
                                            <div className="flex items-center">
                                                {product.discount > 0 ? <div className="flex items-center">
                                                    <Typography variant="h5" color="red" className="font-semibold mb-4 mt-2 mr-3" textGradient>
                                                        {formatNumber(Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)} đ
                                                    </Typography>
                                                    <Typography variant="h6" className="font-normal line-through mb-4 mt-2 text-gray-500" textGradient>
                                                        {formatNumber(product.price)} đ
                                                    </Typography>
                                                </div> : <Typography variant="h5" color="red" className="font-semibold mb-4 mt-2" textGradient>
                                                    {formatNumber(product.price)} đ
                                                </Typography>}
                                            </div>
                                            <Button color="red" className="w-[240px]" onClick={() => {
                                                if (!window.localStorage.getItem('User')) {
                                                    window.location.href = 'http://localhost:3000/SignIn'
                                                } else handleAddCart(product.id, 1, Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)
                                            }}>
                                                {language == 1 ? 'THÊM VÀO GIỎ HÀNG' : 'ADD TO CART'}
                                            </Button>
                                        </CardBody>
                                        {product.discount > 0 ? <div className="absolute top-4 right-0 w-[70px] h-[30px] bg-red-500 rounded-tl rounded-bl text-white text-base flex justify-center items-center">
                                            -{product.discount}%
                                        </div> : ''}
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <>
                {contextHolder}
                <Space className="hidden">
                    <Button type="primary" onClick={() => openNotification('top')}>
                        top
                    </Button>
                </Space>
            </>
        </>
    );
}
