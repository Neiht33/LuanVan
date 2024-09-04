import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './cart.css'
import {
    Typography,
    Radio,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card
} from "@material-tailwind/react";
import { Col, Row, Flex, InputNumber, ConfigProvider, notification, Space, Result, } from 'antd';
import img1 from '../../../img/bearbrick.png'
import { format } from 'date-fns-tz';
import axios from 'axios';
import Paypal from '../Paypal/paypal';

export default function Cart({ language, cartDetail, getApiCartDetail }) {

    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false);
    const [methodPay, setMethodPay] = useState(1);
    const [timeCurrent, setTimeCurrent] = useState();
    const TABLE_HEAD = ["Sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"];
    var formSubmit = useRef({
        productID: '',
        quantity: '',
        price: '',
        total: '',
        accountID: JSON.parse(window.localStorage.getItem('User')).id
    })

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api[type]({
            message: 'Đặt hàng thành công',
            description:
                'Đơn hàng đã được gửi đến trang',
            placement: 'top'
        });
    };

    useLayoutEffect(() => {
        if (window.localStorage.getItem('User')) {
            setUser(JSON.parse(window.localStorage.getItem('User')))
            getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
        }
    }, [])

    const handleOpen = () => {
        setOpen(!open)
        setTimeCurrent(formatDate(new Date()));
    };

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

    const handleDeleteItemCart = async (productID, accountID) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/item?productID=${productID}&accountID=${accountID}`)
                .then(response => response.json())
                .then(result => {
                })
                .catch(error => {
                    console.error('Error:', error);

                });
            getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const handleUpdateCart = (quantity) => {
        const price = formSubmit.current.price
        formSubmit.current = {
            ...formSubmit.current,
            quantity: quantity,
            total: quantity * price
        }

        axios.put(`http://localhost:8080/api/cart/update`, formSubmit.current, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
                console.log(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    }

    const handleOrderSubmit = (paymentStatus) => {

        const formOrderSubmit = {
            total: cartDetail[0].totalFinal,
            statusID: 1,
            paymentMethod: methodPay,
            accountID: user.id,
            paymentStatus: paymentStatus
        }

        axios.post(`http://localhost:8080/api/order/`, formOrderSubmit, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                setOpen(!open)
                getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
                openNotification('success')
                window.location.href = 'http://localhost:3000/Account/order'
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    }

    const handleChangeQuantity = debounce((event) => {
        handleUpdateCart(event)
    }, 500)

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    return (
        <div className='Cart'>
            <div className='Cart-title my-10'>
                <Typography className='font-normal' variant="h1">
                    {language == 1 ? 'Giỏ Hàng Của Bạn' : 'Your Cart'}
                </Typography>
            </div>
            {cartDetail.length != 0 && <Row className='Cart-body px-8'>
                <Col className='Cart-detail' xl={{ span: 16, offset: 0 }} sm={{ span: 24, offset: 0 }}>
                    <div className='Cart-detail_container'>
                        <Row className='Cart-detail_title hidden md:flex'>
                            <Col className='text-start' xl={{ span: 10, offset: 0 }} sm={{ span: 9, offset: 0 }}>
                                {language == 1 ? 'SẢN PHẨM' : 'Product'}
                            </Col>
                            <Col className='text-center' xl={{ span: 5, offset: 0 }} sm={{ span: 6, offset: 0 }}>
                                {language == 1 ? 'Giá' : 'Price'}
                            </Col>
                            <Col className='text-center' xl={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }}>
                                {language == 1 ? 'Số lượng' : 'Quantity'}
                            </Col>
                            <Col className='text-center' xl={{ span: 3, offset: 0 }} sm={{ span: 3, offset: 0 }}>
                                {language == 1 ? 'Tổng cộng' : 'Total Price'}
                            </Col>
                            <Col className='text-center' xl={{ span: 2, offset: 0 }} sm={{ span: 2, offset: 0 }}>
                            </Col>
                        </Row>
                        <div className='Cart-detail_product sm:bg-transparent bg-white py-4'>
                            {cartDetail.map((item, index) => (
                                <Row key={index} className='flex items-center my-8' style={{ height: '120px' }}>
                                    <Col className='text-start w-full sm:border-0 border-t-2 border-t-gray-500' xl={{ span: 10, offset: 0 }} sm={{ span: 9, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                                        <div className='product-info flex items-center'>
                                            <div className='product-info_img h-[100px] bg-white w-[100px] mr-4 p-1'>
                                                <img className='w-full h-full m-auto' src={`http://localhost:8080/images/${item.img}`} alt='anh' />
                                            </div>
                                            <Typography className='font-normal w-9/12' variant="h6">
                                                {item.name}
                                            </Typography>
                                        </div>
                                    </Col>
                                    <Col className='text-center text-base' xl={{ span: 5, offset: 0 }} sm={{ span: 6, offset: 0 }} xs={{ span: 0, offset: 0 }}>
                                        <div className='text-center text-base flex items-center justify-center'>
                                            {item.discount > 0 ? <div className='font-normal line-through mr-2 text-gray-500'>{formatNumber(item.price)} đ</div> : ''}
                                            {formatNumber(Math.floor((item.price - (item.price * item.discount) / 100) / 1000) * 1000)} đ
                                        </div>
                                        {item.discount > 0 ? <span className='text-sm' style={{ color: 'red' }}>Giảm giá {item.discount}%</span> : ''}
                                    </Col>
                                    <Col className='flex justify-center' xl={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} xs={{ span: 8, offset: 5 }}>
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
                                                <InputNumber min={1} max={item.wareHouse} defaultValue={item.quantityCurrent} onChange={(event) => {
                                                    formSubmit.current = {
                                                        ...formSubmit.current,
                                                        productID: item.id,
                                                        price: Math.floor((item.price - (item.price * item.discount) / 100) / 1000) * 1000
                                                    }
                                                    handleChangeQuantity(event)
                                                }} />
                                            </Flex>
                                        </ConfigProvider>
                                    </Col>
                                    <Col className='text-center text-base' xl={{ span: 3, offset: 0 }} sm={{ span: 3, offset: 0 }} xs={{ span: 8, offset: 1 }}>
                                        {formatNumber(item.total)} đ
                                    </Col>
                                    <Col className='flex justify-center cursor-pointer' xl={{ span: 2, offset: 0 }} sm={{ span: 2, offset: 0 }} xs={{ span: 2, offset: 0 }} onClick={() => handleDeleteItemCart(item.id, JSON.parse(window.localStorage.getItem('User')).id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#1f1f1f" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path></svg>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </div>
                    <div className='Cart-detail_total-container w-[300px] float-right'>
                        <div className='Cart-detail_total-product my-4 flex justify-between items-end'>
                            <Typography className='font-normal text-gray-600' variant="h6">
                                {language == 1 ? 'Tiền hàng hóa' : 'Subtotal'}:
                            </Typography>
                            <Typography className='font-normal' variant="h5">
                                {cartDetail[0] ? formatNumber(cartDetail[0].totalFinal) : '0'} đ
                            </Typography>
                        </div>
                        <div className='Cart-detail_total-product my-4 flex justify-between items-end'>
                            <Typography className='font-normal text-gray-600' variant="h6">
                                Voucher:
                            </Typography>
                            <Typography className='font-normal' variant="h5">
                                0 đ
                            </Typography>
                        </div>
                        <div className='Cart-detail_total-price my-4 flex justify-between items-end'>
                            <Typography className='' variant="h5">
                                {language == 1 ? 'Tổng thanh toán' : 'Total'}:
                            </Typography>
                            <Typography className=' text-red-500' variant="h5">
                                {cartDetail[0] ? formatNumber(cartDetail[0].totalFinal) : '0'} đ
                            </Typography>
                        </div>
                    </div>
                </Col>
                <Col className='Cart-bill bg-white rounded px-4' xl={{ span: 7, offset: 1 }} sm={{ span: 24 }}>
                    <Typography className='font-normal my-8' variant="h5">
                        {language == 1 ? 'THÔNG TIN THANH TOÁN' : 'Payment Info.'}
                    </Typography>
                    <Typography className='font-normal text-gray-600 text-start' variant="h6">
                        {language == 1 ? 'Phương thức thanh toán' : 'Payment Method'}
                    </Typography>
                    <div className="flex flex-col gap-2 mb-8">
                        <Radio
                            name="terms"
                            color="blue"
                            onClick={() => setMethodPay(1)}
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
                                        {language == 1 ? 'Tiền mặt' : 'Cash'}
                                    </Typography>
                                </Typography>
                            }
                            defaultChecked
                        />
                        <Radio
                            name="terms"
                            color="blue"
                            onClick={() => setMethodPay(2)}
                            label={
                                <Typography
                                    color="blue-gray"
                                    className="flex font-medium text-blue-gray-500"
                                >
                                    <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path d="M33.0312 28C39 28 43 25.5 43 20C43 14.5 39 12 33.0312 12H22L17 43H26L28 28H33.0312Z" clipRule="evenodd"></path><path d="M18 36H10L15 5H26.0312C32 5 36 7.5 36 13C36 18.5 32 21 26.0312 21H21"></path></g></svg>
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
                            {language == 1 ? 'Tên người thanh toán' : 'Payer name'}
                        </Typography>
                        <Typography
                            className="font-normal text-start"
                            variant="h6"
                        >
                            {user.name}
                        </Typography>
                    </div>
                    <div className='mb-8'>
                        <Typography className='font-normal text-gray-600 text-start my-2' variant="h6">
                            {language == 1 ? 'Số điện thoại' : 'Phone number'}
                        </Typography>
                        <Typography
                            className="font-normal text-start"
                            variant="h6"
                        >
                            *** *** *{user.phoneNumber ? `${user.phoneNumber.slice(-3)}` : ''}
                        </Typography>
                    </div>
                    <div className='mb-8'>
                        <Typography className='font-normal text-gray-600 text-start my-2' variant="h6">
                            {language == 1 ? 'Địa chỉ' : 'Address'}
                        </Typography>
                        <Typography
                            className="font-normal text-start"
                            variant="h6"
                        >
                            {`${user.city} - ${user.district} - ${user.address}`}
                        </Typography>
                    </div>
                    <div className='pb-4'>
                        <>
                            <Button onClick={handleOpen} color="blue" className='w-full text-base' size='lg' variant="filled">
                                {language == 1 ? 'Mua ngay' : 'Check out'}
                            </Button>
                            <Dialog open={open} handler={handleOpen} className='px-4'>
                                <DialogHeader className='flex justify-center'>
                                    {language == 1 ? 'HÓA ĐƠN THANH TOÁN' : 'BILL'}
                                </DialogHeader>
                                <DialogBody>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center text-black'>
                                            <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                {language == 1 ? 'Khách hàng' : 'Customer'}:
                                            </Typography>
                                            <Typography
                                                className="font-normal text-start"
                                                variant="h6"
                                            >
                                                {user.name}
                                            </Typography>
                                        </div>
                                        <div className='flex items-center text-black'>
                                            <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                {language == 1 ? 'Số điện thoại' : 'Phone number'}:
                                            </Typography>
                                            <Typography
                                                className="font-normal text-start"
                                                variant="h6"
                                            >
                                                *** *** *{user.phoneNumber ? `${user.phoneNumber.slice(-3)}` : ''}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className='flex items-center text-black'>
                                        <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                            {language == 1 ? 'Địa chỉ' : 'Address'}:
                                        </Typography>
                                        <Typography
                                            className="font-normal text-start"
                                            variant="h6"
                                        >
                                            {`${user.city} - ${user.district} - ${user.address}`}
                                        </Typography>
                                    </div>
                                    <div className='timeOrder text-black my-2'>
                                        {language == 1 ? 'Thời gian' : 'Time'}: {timeCurrent}
                                    </div>
                                    <Card className="h-full w-full overflow-auto rounded-none shadow-none" style={{ border: '1px solid #000' }}>
                                        <table className="w-full min-w-max table-auto text-left">
                                            <thead>
                                                <tr>
                                                    {TABLE_HEAD.map((head, index) => (
                                                        <th key={head} className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${index == 0 ? 'w-[200px]' : 'text-center'}`}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal leading-none opacity-70"
                                                            >
                                                                {head}
                                                            </Typography>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartDetail.map((item, index) => (
                                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                                        <td className="p-4">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {item.name}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {item.quantityCurrent}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {formatNumber(Math.floor((item.price - (item.price * item.discount) / 100) / 1000) * 1000)}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                                {formatNumber(item.total)}
                                                            </Typography>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Card>
                                    <div className='flex justify-between items-center my-2'>
                                        <Typography className='font-normal text-black ' variant="h4">
                                            {language == 1 ? 'Tổng thanh toán' : 'Total'}:
                                        </Typography>
                                        <Typography className='font-normal text-black ' variant="h4">
                                            {cartDetail[0] ? formatNumber(cartDetail[0].totalFinal) : '0'} đ
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2 mb-8">
                                        <Typography className='font-normal text-gray-600 text-start' variant="h6">
                                            {language == 1 ? 'Phương thức thanh toán' : 'Payment Method'}:
                                        </Typography>
                                        {methodPay == 1 ? <Typography
                                            color="blue-gray"
                                            className="flex font-medium text-blue-gray-500 flex items-center"
                                        >
                                            <Typography
                                                color="blue-gray"
                                                className="hover:text-blueg-gray-900 font-medium transition-colors"
                                            >
                                                {language == 1 ? 'Thanh toán khi nhận hàng' : 'Cash'}
                                            </Typography>
                                        </Typography> : ''}
                                        {methodPay != 1 ? <Typography
                                            color="blue-gray"
                                            className="flex font-medium text-blue-gray-500"
                                        >
                                            <svg className='text-2xl mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path d="M33.0312 28C39 28 43 25.5 43 20C43 14.5 39 12 33.0312 12H22L17 43H26L28 28H33.0312Z" clipRule="evenodd"></path><path d="M18 36H10L15 5H26.0312C32 5 36 7.5 36 13C36 18.5 32 21 26.0312 21H21"></path></g></svg>
                                            <Typography
                                                color="blue-gray"
                                                className="hover:text-blueg-gray-900 font-medium transition-colors"
                                            >
                                                PayPal
                                            </Typography>
                                        </Typography> : ''}
                                    </div>
                                </DialogBody>
                                <DialogFooter className='flex justify-center'>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>{language == 1 ? 'Hủy' : 'Cancel'}</span>
                                    </Button>
                                    {methodPay == 1 ? <Button className='w-[200px] text-base' color='blue' size='lg' variant="filled" onClick={() => handleOrderSubmit(0)}>
                                        <span>{language == 1 ? 'Đặt hàng' : 'Confirm'}</span>
                                    </Button> : <Paypal amount={cartDetail[0] ? Math.floor(cartDetail[0].totalFinal / 23500) : 0} payload={handleOrderSubmit} />}
                                </DialogFooter>
                            </Dialog>
                        </>
                    </div>
                </Col>
            </Row>}
            {cartDetail.length == 0 && <div className=''>
                <Result
                    className='py-0 px-[48px]'
                    status="404"
                    title={language == 1 ? 'Giỏ Hàng Của Bạn Đang Trống' : 'Your Shopping Cart Is Empty'}
                    extra={<Button className='w-60 h-14 my-4' type="primary" color='blue' onClick={() => window.location.href = 'http://localhost:3000/Product'}>
                        <div className=' flex justify-center items-center text-lg'>
                            <svg className='text-2xl mr-4' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffffff" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"></path></svg>
                            Mua sắm ngay
                        </div>
                    </Button>}
                />
            </div>}

            <>
                {contextHolder}
                <Space className="hidden">
                    <Button type="primary" onClick={() => openNotification('top')}>
                        top
                    </Button>
                </Space>
            </>
        </div>
    );
}