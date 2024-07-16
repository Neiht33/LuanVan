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
    CardFooter
} from "@material-tailwind/react";

export default function SignIn({ language }) {

    var arrayLabelSignUpVN = ['Họ và tên', 'Địa chỉ', 'Số điện thoại', 'Mật khẩu', 'Nhập lại mật khẩu']
    var arrayLabelSignUpEng = ['Full name', 'Address', 'Phone number', 'Password', 'Repassword']
    var arrayLabelSignInVN = ['Số điện thoại', 'Mật khẩu']
    var arrayLabelSignInEng = ['Phone number', 'Password']
    const [currentLG, setCurrentLG] = useState(arrayLabelSignUpVN)
    const [currentLG2, setCurrentLG2] = useState(arrayLabelSignInVN)

    useEffect(() => {
        const signUp = document.querySelectorAll('.translate-signUp_title')
        const signUpLink = document.querySelector('.translate-signUp_link')
        const signIn = document.querySelectorAll('.translate-signIn_title')
        const signInSupport = document.querySelector('.translate-signIn_support')

        if (language == 1) {
            signUp[0].textContent = 'Đăng Ký'
            signUp[1].textContent = 'Đăng Ký'
            signIn[0].textContent = 'Đăng Nhập'
            signIn[1].textContent = 'Đăng Nhập'
            signInSupport.textContent = 'Bạn chưa có tài khoản?'
            signUpLink.textContent = 'Đăng ký'
            setCurrentLG(arrayLabelSignUpVN)
            setCurrentLG2(arrayLabelSignInVN)
        } else {
            signUp[0].textContent = 'Sign Up'
            signUp[1].textContent = 'Sign Up'
            signIn[0].textContent = 'Sign In'
            signIn[1].textContent = 'Sign In'
            signInSupport.innerHTML = 'Don&apos;t have an account?'
            signUpLink.textContent = 'Sign up'
            setCurrentLG(arrayLabelSignUpEng)
            setCurrentLG2(arrayLabelSignInEng)
        }
    }, [language])

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
            <Card className="w-full max-w-[48rem] flex-row relative overflow-hidden">
                <CardBody style={{ display: 'none' }} className='signUp flex justify-center items-center w-full'>
                    <Card className="w-96" style={{ boxShadow: 'none' }}>
                        <Typography className='translate-signUp_title' variant="h3">
                            Đăng Ký
                        </Typography>
                        <CardBody className="flex flex-col gap-4">
                            <Input className='signUp_name' variant="standard" label={currentLG[0]} size="lg" required />
                            <Input className='signUp_address' variant="standard" label={currentLG[1]} size="lg" required />
                            <Input className='signUp_phoneNumber' variant="standard" label={currentLG[2]} required />
                            <Input className='signUp_pass' variant="standard" label={currentLG[3]} type='password' size="lg" required />
                            <Input className='signUp_repass' variant="standard" label={currentLG[4]} type='password' size="lg" required />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button className='translate-signUp_title' variant="gradient" fullWidth onClick={() => handleMoveOnIn()}>
                                Đăng Ký
                            </Button>
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
                    <Card className="w-96" style={{ boxShadow: 'none' }}>
                        <Typography className='translate-signIn_title' variant="h3">
                            Đăng Nhập
                        </Typography>
                        <CardBody className="flex flex-col gap-4 mb-4">
                            <Input variant="standard" label={currentLG2[0]} required />
                            <Input variant="standard" label={currentLG2[1]} type='password' size="lg" required />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button className='translate-signIn_title' variant="gradient" fullWidth>
                                Đăng Nhập
                            </Button>
                            <Typography variant="small" className="mt-6 flex justify-center">
                                <span className='translate-signIn_support'>Bạn chưa có tài khoản?</span>
                                <Typography
                                    as="a"
                                    href="#signup"
                                    variant="small"
                                    color="blue-gray"
                                    className="translate-signUp_link ml-1 font-bold"
                                    onClick={() => handleMoveOnUp()}
                                >
                                    Đăng ký
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </CardBody>
                <div
                    shadow={false}
                    floated={false}
                    className='imgMove h-full'>
                    <img
                        src={img}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </div>
            </Card>
        </div>
    );
}