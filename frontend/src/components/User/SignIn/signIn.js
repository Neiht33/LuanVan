import React, { useEffect, useState } from 'react';
import './signIn.css'
import img from '../../../img/bg-signIn.jpg'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Checkbox,
    CardFooter,
    Option,
    Select
} from "@material-tailwind/react";
import axios from 'axios';
import { notification, Space } from 'antd';

export default function SignIn({ language }) {

    const [api, contextHolder] = notification.useNotification();
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedDistrictID, setSelectedDistrictID] = useState();

    useEffect(() => {
        getApiCity()
    }, [])

    const getApiCity = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/account/address`);
            const data = await response.json();
            if (data) {
                setCity(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiDistrict = async (id) => {
        try {
            setSelectedDistrict('')
            const response = await fetch(`http://localhost:8080/api/account/address/district/${id}`);
            const data = await response.json();
            if (data) {
                setDistrict(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiAccount = async (phone, password) => {
        try {
            const response = await fetch(`http://localhost:8080/api/account/customer?phone=${phone}&password=${password}`);
            const data = await response.json();
            if (data) {
                if (data.checkPhone == false) {
                    openNotificationErrorPhone('error')
                } else
                    if (data.checkPassword == false) {
                        openNotificationErrorPassword('error')
                    } else {
                        window.localStorage.setItem('User', JSON.stringify(data[0]))
                        window.location.href = 'http://localhost:3000/';
                    }

            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const handleSubmit = () => {
        const signUp_name = document.querySelector('.signUp_name')
        const signUp_address = document.querySelector('.signUp_address')
        const signUp_phoneNumber = document.querySelector('.signUp_phoneNumber')
        const signUp_pass = document.querySelector('.signUp_pass')
        const signUp_repass = document.querySelector('.signUp_repass')

        var formSubmit = {
            name: signUp_name.value,
            phoneNumber: signUp_phoneNumber.value,
            address: signUp_address.value,
            password: signUp_pass.value,
            district: selectedDistrictID
        }

        if (signUp_address.value == '' || signUp_name.value == '' || signUp_pass.value == '' || signUp_phoneNumber.value == '' || signUp_repass.value == '' || selectedDistrict == '') {
            openNotificationError('error')
            return
        } else
            if (signUp_pass.value !== signUp_repass.value) {
                openNotificationErrorNotMatch('error')
                return
            }

        axios.post(`http://localhost:8080/api/account`, formSubmit, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);
                if (response.data.checkPhone != false) {
                    openNotificationSuccess('success')
                    handleMoveOnIn()
                } else openNotificationErrorCheckPhone('error')
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    }

    const handleSignIn = () => {
        const SignIn_phone = document.querySelector('.SignIn_phone')
        const SignIn_pass = document.querySelector('.SignIn_pass')

        // Biểu thức chính quy số điện thoại hợp lệ
        const pattern = /^(0\d{9}|0\d{2}[\s.-]?\d{3}[\s.-]?\d{3}|\+84\d{9}|\+84\d{2}[\s.-]?\d{3}[\s.-]?\d{3})$/

        if (SignIn_phone.value != '' && SignIn_pass.value != '' && pattern.test(SignIn_phone.value)) {
            getApiAccount(SignIn_phone.value, SignIn_pass.value)
        } else return
    }

    const openNotificationSuccess = (type) => {
        api[type]({
            message: 'Đăng ký thành công',
        });
    };

    const openNotificationError = (type) => {
        api[type]({
            message: 'Không thành công',
            description:
                'Bạn chưa điền hết thông tin cần thiết.',
        });
    };

    const openNotificationErrorCheckPhone = (type) => {
        api[type]({
            message: 'Số điện thoại đã được đăng ký',
        });
    };

    const openNotificationErrorPhone = (type) => {
        api[type]({
            message: 'Số điện thoại chưa được đăng ký',
        });
    };

    const openNotificationErrorPassword = (type) => {
        api[type]({
            message: 'Mật khẩu không đúng',
        });
    };

    const openNotificationErrorNotMatch = (type) => {
        api[type]({
            message: 'Không thành công',
            description:
                'Mật khẩu không trùng khớp.',
        });
    };

    const handleMoveOnIn = () => {
        const imgMove = document.querySelector('.imgMove')
        const signUp = document.querySelector('.signUp')
        const signIn = document.querySelector('.signIn')
        imgMove.classList.remove("move-right")
        imgMove.classList.add("move-left")
        signUp.style.display = 'none'
        signIn.style.display = 'flex'
    }

    const handleMoveOnUp = () => {
        const imgMove = document.querySelector('.imgMove')
        const signUp = document.querySelector('.signUp')
        const signIn = document.querySelector('.signIn')
        imgMove.classList.remove("move-left")
        imgMove.classList.add("move-right")
        signIn.style.display = 'none'
        signUp.style.display = 'flex'
    }

    return (
        <div className='SignIn flex justify-center items-center'>
            <Card className="w-full md:max-w-[50rem] md:h-[600px] flex-row relative overflow-hidden">
                <CardBody style={{ display: 'none' }} className='signUp flex justify-center items-center w-full py-6 pr-0 sm:pl-6 pl-0'>
                    <Card className="md:w-96" style={{ boxShadow: 'none' }}>
                        <Typography className='translate-signUp_title' variant="h3">
                            {language == 1 ? 'Đăng Ký' : 'Sign Up'}
                        </Typography>
                        <CardBody className="p-0 flex flex-col gap-4">
                            <Input className='signUp_name' variant="standard" label={language == 1 ? 'Họ và tên' : 'Full name'} size="lg" required />
                            <Select className='' variant="standard" selected={() => selectedCity} onChange={setSelectedCity} label={language == 1 ? 'Tỉnh / Thành phố' : 'Province / City'}>
                                {city.map((item, index) =>
                                    <Option value={item.city} key={index} onClick={() => {
                                        getApiDistrict(item.id)
                                    }}>{item.city}</Option>
                                )}
                            </Select>
                            <Select onChange={setSelectedDistrict} selected={() => selectedDistrict} className='district-selected' variant="standard" label={language == 1 ? 'Quận / Huyện' : 'District'}>
                                {district.map((item, index) =>
                                    <Option value={item.district} key={index} onClick={() => setSelectedDistrictID(item.id)}>{item.district}</Option>
                                )}
                            </Select>
                            <Input className='signUp_address' variant="standard" label={language == 1 ? 'Địa chỉ (Xã, Thị trấn, Đường, Số nhà)' : 'Address (Town, street, house number)'} size="lg" required />
                            <Input className='signUp_phoneNumber' variant="standard" label={language == 1 ? 'Số điện thoại' : 'Phone number'} required />
                            <Input className='signUp_pass' variant="standard" label={language == 1 ? 'Mật khẩu' : 'Password'} type='password' size="lg" required />
                            <Input className='signUp_repass' variant="standard" label={language == 1 ? 'Nhập lại mật khẩu' : 'Repassword'} type='password' size="lg" required />
                        </CardBody>
                        <CardFooter className="p-0 mt-4">
                            <Button className='translate-signUp_title mb-3' variant="gradient" fullWidth onClick={() => handleSubmit()}>
                                {language == 1 ? 'Đăng ký' : 'Sign up'}
                            </Button>
                            <Typography variant="small" className="mt-6 flex justify-center">
                                <span className='translate-signIn_support'>
                                    {language == 1 ? 'Bạn đã có tài khoản?' : "You already have an account?"}
                                </span>
                                <Typography
                                    as="a"
                                    href="#signup"
                                    variant="small"
                                    color="blue-gray"
                                    className="translate-signUp_link ml-1 font-bold"
                                    onClick={() => handleMoveOnIn()}
                                >
                                    {language == 1 ? 'Đăng nhập' : 'Sign in'}
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </CardBody>
                <CardHeader
                    shadow={false}
                    floated={false}
                    className='signIn-img m-0 w-2/5 shrink-0'
                    style={{ height: '545px' }}
                />
                <CardBody className='signIn flex justify-center items-center w-full'>
                    <Card className="md:w-96" style={{ boxShadow: 'none' }}>
                        <Typography className='translate-signIn_title' variant="h3">
                            {language == 1 ? 'Đăng Nhập' : 'Sign In'}
                        </Typography>
                        <CardBody className="flex flex-col gap-4 mb-4">
                            <Input className='SignIn_phone' variant="standard" label={language == 1 ? 'Số điện thoại' : 'Phone number'} required />
                            <Input className='SignIn_pass' variant="standard" label={language == 1 ? 'Mật khẩu' : 'Password'} type='password' size="lg" required />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button className='translate-signIn_title' variant="gradient" fullWidth onClick={() => handleSignIn()}>
                                {language == 1 ? 'Đăng Nhập' : 'Sign In'}
                            </Button>
                            <Typography variant="small" className="mt-6 flex justify-center">
                                <span className='translate-signIn_support'>
                                    {language == 1 ? 'Bạn chưa có tài khoản?' : "You don't have an account?"}
                                </span>
                                <Typography
                                    as="a"
                                    href="#signup"
                                    variant="small"
                                    color="blue-gray"
                                    className="translate-signUp_link ml-1 font-bold"
                                    onClick={() => handleMoveOnUp()}
                                >
                                    {language == 1 ? 'Đăng ký' : 'Sign Up'}
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </CardBody>
                <div
                    shadow={false}
                    floated={false}
                    className='imgMove md:w-[350px] w-[200px] h-full'>
                    <img
                        src={img}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </div>
            </Card>
            <>
                {contextHolder}
                <Space>
                    <Button className="hidden notifyBoxSuccess" onClick={() => openNotificationSuccess('success')}>Success</Button>
                    <Button className="hidden notifyBoxError" onClick={() => openNotificationError('error')}>Error</Button>
                </Space>
            </>
        </div>
    );
}