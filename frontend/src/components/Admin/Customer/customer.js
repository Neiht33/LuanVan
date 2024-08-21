import React from "react";
import { Col, Row } from "antd";
import { Typography } from "@material-tailwind/react"
import { format } from 'date-fns-tz';

export default function Customer({ account }) {

    const formatDate = (date) => {
        const formattedDate = format(date, 'dd-MM-yyyy HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
        return formattedDate;
    }

    return (
        <div>
            <Typography variant="h3" className="my-8 text-start">
                Khách hàng
            </Typography>
            <div className="w-full">
                <Row className='order-title w-full py-4'>
                    <Col className='text-center' xl={{ span: 1, offset: 0 }}>#</Col>
                    <Col className='text-start' xl={{ span: 5, offset: 0 }}>Tên Khách Hàng</Col>
                    <Col className='text-start' xl={{ span: 8, offset: 0 }}>Địa Chỉ</Col>
                    <Col className='text-center' xl={{ span: 3, offset: 0 }}>Số Điện Thoại</Col>
                    <Col className='text-center' xl={{ span: 3, offset: 0 }}>Ngày Tạo</Col>
                    <Col className='text-center' xl={{ span: 2, offset: 0 }}>Tổng Đơn</Col>
                    <Col className='text-start' xl={{ span: 1, offset: 0 }}></Col>
                </Row>
                {account.map((user, index) => (
                    <Row className={`w-full py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                        <Col className='text-center' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                        <Col className='text-start' xl={{ span: 5, offset: 0 }}>{user.name}</Col>
                        <Col className='text-start' xl={{ span: 8, offset: 0 }}>{`${user.city} - ${user.district} - ${user.address}`}</Col>
                        <Col className='text-center' xl={{ span: 3, offset: 0 }}>{user.phoneNumber}</Col>
                        <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatDate(user.date)}</Col>
                        <Col className='text-center' xl={{ span: 2, offset: 0 }}>{user.accountID != null ? user.quantity : '0'}</Col>
                        <Col className='flex justify-center text-start' xl={{ span: 2, offset: 0 }}>
                            <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3z"></path></svg>
                            <svg className="text-2xl ml-4" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><g fill="none" stroke="#ff0000" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="2.75" r="2.25"></circle><path d="M5 12.5H.5V11a4.5 4.5 0 0 1 6.73-3.91m6.27 2.17L9.26 13.5m0-4.24l4.24 4.24"></path></g></svg>
                        </Col>
                    </Row>
                ))}
            </div>
        </div>
    );
}