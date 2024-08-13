import React, { useEffect, useState } from 'react';
import {
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Button
} from "@material-tailwind/react";
import { Col, Row, Tag } from "antd";
import './order.css'
import img1 from '../../../img/bearbrick.png'
import { format } from 'date-fns-tz';

export default function Order() {
    const [activeTab, setActiveTab] = useState("allOrder");
    const [order, setOrder] = useState([]);
    const data = [
        {
            label: "Tất cả đơn hàng",
            value: "allOrder"
        },
        {
            label: "Chờ duyệt",
            value: "waitAccept"
        },
        {
            label: "Đang giao",
            value: "panding",
        },
        {
            label: "Hoàn thành",
            value: "complete",
        },
        {
            label: "Đơn đã hủy",
            value: "canceled",
        },
        {
            label: "Yêu cầu hủy đơn",
            value: "waitCancel",
        }
    ];

    useEffect(() => {
        getApiOrder()
    }, [])

    const getApiOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/order`);
            const data = await response.json();
            if (data) {
                setOrder(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const formatDate = (date) => {
        const formattedDate = format(date, 'dd-MM-yyyy HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
        return formattedDate
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

    return (
        <Row>
            <Typography variant="h3" className="my-8 text-start">
                Đơn Hàng
            </Typography>
            <Col xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={`text-lg ${activeTab === value ? "text-blue-500" : ""}`}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </Col>
            <Row className='order-title w-full mt-4 py-4'>
                <Col className='text-start' xl={{ span: 1, offset: 0 }}>#</Col>
                <Col className='text-start' xl={{ span: 3, offset: 0 }}>Mã Đơn Hàng</Col>
                <Col className='text-start' xl={{ span: 4, offset: 0 }}>Tên Khách Hàng</Col>
                <Col className='text-start' xl={{ span: 7, offset: 0 }}>Địa Chỉ</Col>
                <Col className='text-center' xl={{ span: 4, offset: 0 }}>Thời Gian</Col>
                <Col className='text-center' xl={{ span: 3, offset: 0 }}>Giá</Col>
                <Col className='text-center' xl={{ span: 2, offset: 0 }}>Trạng Thái</Col>
            </Row>
            <div className={`allOrder w-full ${activeTab == 'allOrder' ? 'block' : 'hidden'}`}>
                {order.map((item, index) => (
                    <Row className='order-title w-full h-[88px] py-4 flex items-center'>
                        <Col className='text-start' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                        <Col className='text-start' xl={{ span: 3, offset: 0 }}>#{item.id}</Col>
                        <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                        <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                        <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                        <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                        <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                            {/* <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="success">Hoàn Thành</Tag> */}
                            {item.statusID == 1 && <Button color="blue">Duyệt đơn</Button>}
                        </Col>
                    </Row>
                ))}
            </div>
            <div className={`allOrder w-full ${activeTab == 'waitAccept' ? 'block' : 'hidden'}`}>
                {order.map((item, index) => {
                    if (item.statusID == 1) {
                        return (
                            <Row className='order-title w-full h-[88px] py-4 flex items-center'>
                                <Col className='text-start' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>#{item.id}</Col>
                                <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                                <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                                <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                                <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                                    {/* <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="success">Hoàn Thành</Tag> */}
                                    {item.statusID == 1 && <Button color="blue">Duyệt đơn</Button>}
                                </Col>
                            </Row>
                        )
                    }
                })}
            </div>
            <div className={`allOrder w-full ${activeTab == 'waitCancel' ? 'block' : 'hidden'}`}>
                <Row className='order-title w-full h-[88px] py-4 flex items-center'>
                    <Col className='text-start' xl={{ span: 1, offset: 0 }}>1</Col>
                    <Col className='text-start' xl={{ span: 3, offset: 0 }}>#2012259</Col>
                    <Col className='text-start' xl={{ span: 6, offset: 0 }}>
                        <div className='product-info h-full flex items-center'>
                            <div className='product-info_img h-full w-[50px] mr-4'>
                                <img className='h-[50px] m-auto' src={img1} alt='anh' />
                            </div>
                            <Typography className='font-normal' variant="h6">
                                Bear Brick
                            </Typography>
                        </div>
                    </Col>
                    <Col className='text-start' xl={{ span: 6, offset: 0 }}>P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ</Col>
                    <Col className='text-start' xl={{ span: 3, offset: 0 }}>7/11/2024</Col>
                    <Col className='text-start' xl={{ span: 3, offset: 0 }}>325.000đ</Col>
                    <Col className='text-start' xl={{ span: 2, offset: 0 }}>
                        <Button color="red">Duyệt yêu cầu</Button>
                    </Col>
                </Row>
            </div>
        </Row>
    );
}