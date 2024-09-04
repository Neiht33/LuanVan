import React, { useEffect, useLayoutEffect, useState } from 'react';
import './homepage.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row } from 'antd';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar/sidebar';
import Dashboard from '../Dashboard/dashboard';
import Order from '../Order/order';
import Product from '../Product/product';
import Customer from '../Customer/customer';


export default function Admin() {
    const [account, setAccount] = useState([])
    const [product, setProduct] = useState([])
    const [order, setOrder] = useState([]);

    const location = useLocation();

    useLayoutEffect(() => {
        if (location.pathname === '/Admin' || location.pathname === '/Admin/Order' || location.pathname === '/Admin/Product' || location.pathname === '/Admin/Customer') {
            if ((!window.localStorage.getItem('User')) || (JSON.parse(window.localStorage.getItem('User')).level === 1)) {
                alert('Bạn không được phép truy cập đường dẫn này!!!')
                window.location.href = 'http://localhost:3000/'
                const test = 0
                test = 2
            }
        }


    }, [location]);

    useEffect(() => {
        getApiAccount()
        getAPIProduct()
        getApiOrder()
    }, [])

    const getApiAccount = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/account`);
            const data = await response.json();
            if (data) {
                setAccount(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getAPIProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products`);
            const data = await response.json();
            if (data) {
                setProduct(data.reverse());
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

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

    return (
        <div className="Admin">
            <Row>
                <Col className="bg-white " xl={{ span: 4, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                    <Sidebar />
                </Col>
                <Col className="bg-gray-100" xl={{ span: 20, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                    <Row>
                        <Col className="bg-white" xl={{ span: 24, offset: 0 }}>
                            <div className='w-full h-[100px] flex justify-end items-center px-4'>
                                <div>
                                    <Avatar className='mr-2' icon={<UserOutlined />} style={{
                                        backgroundColor: '#87d068',
                                    }} />
                                    Quản trị viên
                                </div>
                            </div>
                        </Col>
                        <Col className="px-8" xl={{ span: 24, offset: 0 }}>
                            <Routes>
                                <Route path='/' element={<Dashboard account={account} product={product.length} order={order.length} />} />
                                <Route path='/Order' element={<Order getApiOrder={getApiOrder} order={order} />} />
                                <Route path='/Product/*' element={<Product product={product} setProduct={setProduct} getAPIProduct={getAPIProduct} />} />
                                <Route path='/Customer' element={<Customer account={account} />} />
                            </Routes>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}