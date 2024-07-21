import { Col, notification, Row, Space } from "antd";
import { Breadcrumbs, Button, ButtonGroup, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Typography, Select, Textarea, Card, Radio } from "@material-tailwind/react"
import React, { useEffect, useLayoutEffect, useState } from "react";
import img1 from '../../../img/bearbrick.png'
import { Link } from "react-router-dom";
import { AddCategory, AddProduct } from "../Add/AdminAdd";

export default function Product() {

    const [api, contextHolder] = notification.useNotification();
    const [openDelete, setOpenDelete] = useState(false);
    const [currentTab, setCurrentTab] = useState('AllProduct')
    const [product, setProduct] = useState([])

    useLayoutEffect(() => {
        getAPIProduct()
    }, [])

    const getAPIProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products`);
            const data = await response.json();
            if (data) {
                setProduct(data);
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

    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const openNotificationSuccess = (type) => {
        api[type]({
            message: 'Thêm thành công',
            description:
                'Sản phẩm đã được đăng lên trang',
        });
    };

    const openNotificationWithIconError = (type) => {
        api[type]({
            message: 'Không thành công',
            description:
                'Bạn chưa nhập hết mẫu hoặc sản phẩm đã tồn tại',
        });
    };

    return (
        <Row>
            <Typography variant="h3" className="my-8 text-start">
                Sản phẩm
            </Typography>
            <Col xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <ButtonGroup variant="outlined" fullWidth>
                    <Button onClick={() => setCurrentTab('AddProduct')}>THÊM SẢN PHẨM</Button>
                    <Button onClick={() => setCurrentTab('AddCategory')}>THÊM DANH MỤC</Button>
                    <Button color="black" variant="filled">GIẢM GIÁ</Button>
                </ButtonGroup>
            </Col>
            {(currentTab == 'AllProduct') && <>
                <Row className='order-title w-full mt-4 py-4'>
                    <Col className='text-start' xl={{ span: 6, offset: 0 }}>Tên Sản Phẩm</Col>
                    <Col className='text-start' xl={{ span: 4, offset: 1 }}>Danh Mục</Col>
                    <Col className='text-center' xl={{ span: 2, offset: 0 }}>Giá</Col>
                    <Col className='text-center' xl={{ span: 2, offset: 0 }}>Đã Bán</Col>
                    <Col className='text-center' xl={{ span: 3, offset: 1 }}>Số Lượng Tồn Kho</Col>
                    <Col className='text-start' xl={{ span: 4, offset: 1 }}></Col>
                </Row>
                {product.map((product, index) => {
                    return (
                        <Row key={index} className='w-full flex items-center py-4'>
                            <Col className='text-start flex justify-start items-center' xl={{ span: 6, offset: 0 }}>
                                <div className='product-info_img h-full w-[50px] mr-2' >
                                    <img className='h-[50px] m-auto' src={`http://localhost:8080/images/${product.img}`} alt='anh' />
                                </div>
                                {product.name}
                            </Col>
                            <Col className='text-start' xl={{ span: 4, offset: 1 }}>{product.categoryName}</Col>
                            <Col className='text-center' xl={{ span: 2, offset: 0 }}>{formatNumber(product.price)} đ</Col>
                            <Col className='text-center' xl={{ span: 2, offset: 0 }}>{product.quantity - product.wareHouse}</Col>
                            <Col className='text-center' xl={{ span: 3, offset: 1 }}>{product.quantity}</Col>
                            <Col className='flex justify-end' xl={{ span: 4, offset: 1 }}>
                                <Button color="amber">Chỉnh sửa</Button>
                                <Button className="ml-2" onClick={() => handleOpenDelete()} color="red">
                                    <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"></path></svg>
                                </Button>
                                <Dialog open={openDelete} handler={handleOpenDelete}>
                                    <DialogHeader>Bạn thật sự muốn xóa sản phẩm này?</DialogHeader>
                                    <DialogBody>
                                        Sản phẩm sẽ được xóa hoàn toàn khỏi hệ thống khi bạn chọn Xác nhận
                                    </DialogBody>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleOpenDelete}
                                            className="mr-1"
                                        >
                                            <span>Hủy</span>
                                        </Button>
                                        <Button variant="gradient" color="green" onClick={handleOpenDelete}>
                                            <span>Xác nhận</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </Col>
                        </Row>
                    )
                })}
            </>}
            {(currentTab == 'AddProduct') && <AddProduct setCurrentTab={setCurrentTab} getAPIProduct={getAPIProduct} openNotificationSuccess={openNotificationSuccess} />}
            {(currentTab == 'AddCategory') && <AddCategory setCurrentTab={setCurrentTab} />}
            <>
                {contextHolder}
                <Space>
                    <Button className="hidden notifyBoxSuccess" onClick={() => openNotificationSuccess('success')}>Success</Button>
                    <Button className="hidden notifyBoxError" onClick={() => openNotificationWithIconError('error')}>Error</Button>
                </Space>
            </>
        </Row>
    );
}