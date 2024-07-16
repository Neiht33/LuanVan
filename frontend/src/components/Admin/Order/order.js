import React from 'react';
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

export default function Order() {
    const [activeTab, setActiveTab] = React.useState("allOrder");
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
                <Col className='text-start' xl={{ span: 6, offset: 0 }}>Tên Sản Phẩm</Col>
                <Col className='text-start' xl={{ span: 6, offset: 0 }}>Địa Chỉ</Col>
                <Col className='text-start' xl={{ span: 3, offset: 0 }}>Thời Gian</Col>
                <Col className='text-start' xl={{ span: 3, offset: 0 }}>Giá</Col>
                <Col className='text-start' xl={{ span: 2, offset: 0 }}>Trạng Thái</Col>
            </Row>
            <div className={`allOrder w-full ${activeTab == 'allOrder' ? 'block' : 'hidden'}`}>
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
                        <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="success">Hoàn Thành</Tag>
                    </Col>
                </Row>
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
                        <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="warning">Đang giao</Tag>
                    </Col>
                </Row>
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
                        <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="error">Đã hủy</Tag>
                    </Col>
                </Row>
            </div>
            <div className={`allOrder w-full ${activeTab == 'waitAccept' ? 'block' : 'hidden'}`}>
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
                        <Button color="blue">Duyệt đơn</Button>
                    </Col>
                </Row>
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