import React, { useEffect, useState } from 'react';
import './cart.css'
import {
    Typography,
    Radio,
    Button
} from "@material-tailwind/react";
import { Col, Row, Flex, InputNumber, ConfigProvider, } from 'antd';
import img1 from '../../../img/bearbrick.png'

export default function Cart({ language }) {

    var arrayLabelVN = ['Giỏ Hàng Của Bạn', 'SẢN PHẨM', 'GIÁ', 'SỐ LƯỢNG', 'TỔNG CỘNG', 'Tiền hàng hóa', 'Tổng thanh toán', 'THÔNG TIN THANH TOÁN', 'Phương thức thanh toán', 'Tiền mặt', 'Tên khách hàng', 'Số điện thoại', 'Địa chỉ', 'Mua Ngay']
    var arrayLabelEng = ['Your Cart', 'Product', 'Price', 'Quantity', 'Total Price', 'Subtotal', 'Total', 'Payment Info.', 'Payment Method', 'Cash', "Customer's Name", 'Phone Number', 'Address', 'Check out']
    const [currentLG, setCurrentLG] = useState(arrayLabelVN)

    useEffect(() => {
        if (language == 1) {
            setCurrentLG(arrayLabelVN)
        } else {
            setCurrentLG(arrayLabelEng)
        }
    }, [language])

    return (
        <div className='Cart'>
            <div className='Cart-title my-10'>
                <Typography className='font-normal' variant="h1">
                    {currentLG[0]}
                </Typography>
            </div>
            <Row className='Cart-body px-8'>
                <Col className='Cart-detail' xl={{ span: 16, offset: 0 }}>
                    <div className='Cart-detail_container'>
                        <Row className='Cart-detail_title'>
                            <Col className='text-start' xl={{ span: 12, offset: 0 }}>
                                {currentLG[1]}
                            </Col>
                            <Col className='text-center' xl={{ span: 3, offset: 0 }}>
                                {currentLG[2]}
                            </Col>
                            <Col className='text-center' xl={{ span: 4, offset: 0 }}>
                                {currentLG[3]}
                            </Col>
                            <Col className='text-center' xl={{ span: 3, offset: 0 }}>
                                {currentLG[4]}
                            </Col>
                            <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                            </Col>
                        </Row>
                        <div className='Cart-detail_product'>
                            <Row className='flex items-center my-8' style={{ height: '120px' }}>
                                <Col className='text-start h-full' xl={{ span: 12, offset: 0 }}>
                                    <div className='product-info h-full flex items-center'>
                                        <div className='product-info_img h-full bg-white w-[100px] mr-4'>
                                            <img className='h-full m-auto' src={img1} alt='anh' />
                                        </div>
                                        <Typography className='font-normal' variant="h4">
                                            Bear Brick
                                        </Typography>
                                    </div>
                                </Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>
                                    300.000
                                </Col>
                                <Col className='flex justify-center' xl={{ span: 4, offset: 0 }}>
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
                                        <Flex vertical gap={12} >
                                            <InputNumber min={1} max={100} defaultValue={1} />
                                        </Flex>
                                    </ConfigProvider>
                                </Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>
                                    TỔNG CỘNG
                                </Col>
                                <Col className='flex justify-center' xl={{ span: 2, offset: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#1f1f1f" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path></svg>
                                </Col>
                            </Row>
                            <Row className='flex items-center my-8' style={{ height: '120px' }}>
                                <Col className='text-start h-full' xl={{ span: 12, offset: 0 }}>
                                    <div className='product-info h-full flex items-center'>
                                        <div className='product-info_img h-full bg-white w-[100px] mr-4'>
                                            <img className='h-full m-auto' src={img1} alt='anh' />
                                        </div>
                                        <Typography className='font-normal' variant="h4">
                                            Bear Brick
                                        </Typography>
                                    </div>
                                </Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>
                                    300.000
                                </Col>
                                <Col className='flex justify-center' xl={{ span: 4, offset: 0 }}>
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
                                        <Flex vertical gap={12} >
                                            <InputNumber min={1} max={100} defaultValue={1} controls={true} />
                                        </Flex>
                                    </ConfigProvider>
                                </Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>
                                    TỔNG CỘNG
                                </Col>
                                <Col className='flex justify-center' xl={{ span: 2, offset: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#1f1f1f" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path></svg>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className='Cart-detail_total-container w-[300px] float-right'>
                        <div className='Cart-detail_total-product my-4 flex justify-between items-end'>
                            <Typography className='font-normal text-gray-600' variant="h6">
                                {currentLG[5]}:
                            </Typography>
                            <Typography className='font-normal' variant="h5">
                                600.000đ
                            </Typography>
                        </div>
                        <div className='Cart-detail_total-product my-4 flex justify-between items-end'>
                            <Typography className='font-normal text-gray-600' variant="h6">
                                Voucher:
                            </Typography>
                            <Typography className='font-normal' variant="h5">
                                0đ
                            </Typography>
                        </div>
                        <div className='Cart-detail_total-price my-4 flex justify-between items-end'>
                            <Typography className='' variant="h5">
                                {currentLG[6]}:
                            </Typography>
                            <Typography className='font-normal' variant="h5">
                                600.000đ
                            </Typography>
                        </div>
                    </div>
                </Col>
                <Col className='Cart-bill bg-white rounded px-4' xl={{ span: 7, offset: 1 }}>
                    <Typography className='font-normal my-8' variant="h5">
                        {currentLG[7]}
                    </Typography>
                    <Typography className='font-normal text-gray-600 text-start' variant="h6">
                        {currentLG[8]}
                    </Typography>
                    <div className="flex flex-col gap-2 mb-8">
                        <Radio
                            name="terms"
                            color="blue"
                            label={
                                <Typography
                                    color="blue-gray"
                                    className="flex font-medium text-blue-gray-500 flex items-center"
                                >
                                    <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#050505" d="M5 6h18v12H5zm9 3a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3M9 8a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2v-4a2 2 0 0 1-2-2zm-8 2h2v10h16v2H1z"></path></svg>
                                    <Typography
                                        color="blue-gray"
                                        className="hover:text-blueg-gray-900 font-medium transition-colors"
                                    >
                                        {currentLG[9]}
                                    </Typography>
                                </Typography>
                            }
                            defaultChecked
                        />
                        <Radio
                            name="terms"
                            color="blue"
                            label={
                                <Typography
                                    color="blue-gray"
                                    className="flex font-medium text-blue-gray-500"
                                >
                                    <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M33.0312 28C39 28 43 25.5 43 20C43 14.5 39 12 33.0312 12H22L17 43H26L28 28H33.0312Z" clipRule="evenodd"></path><path d="M18 36H10L15 5H26.0312C32 5 36 7.5 36 13C36 18.5 32 21 26.0312 21H21"></path></g></svg>
                                    <Typography
                                        color="blue-gray"
                                        className="hover:text-blueg-gray-900 font-medium transition-colors"
                                    >
                                        PayPal
                                    </Typography>
                                </Typography>
                            }
                        />
                    </div>
                    <div className='mb-8'>
                        <Typography className='font-normal text-gray-600 text-start my-2' variant="h6">
                            {currentLG[10]}
                        </Typography>
                        <Typography
                            className="font-normal text-start"
                            variant="h6"
                        >
                            Bùi Quốc Thiên
                        </Typography>
                    </div>
                    <div className='mb-8'>
                        <Typography className='font-normal text-gray-600 text-start my-2' variant="h6">
                            {currentLG[11]}
                        </Typography>
                        <Typography
                            className="font-normal text-start"
                            variant="h6"
                        >
                            *** *** *254
                        </Typography>
                    </div>
                    <div className='mb-8'>
                        <Typography className='font-normal text-gray-600 text-start my-2' variant="h6">
                            {currentLG[12]}
                        </Typography>
                        <Typography
                            className="font-normal text-start"
                            variant="h6"
                        >
                            P.An Khánh, Quận Ninh Kiều, TP.Cần Thơ
                        </Typography>
                    </div>
                    <div className='pb-4'>
                        <Button color="blue" className='w-[300px] text-base' size='large' variant="filled">{currentLG[13]}</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}