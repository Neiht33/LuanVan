import React, { useEffect, useState } from 'react';
import './homepage.css';
import { Route, Routes } from 'react-router-dom';
// import SpeedDial from '../components/User/SpeedDial/speedDial.js';
import { Col, Row } from 'antd';
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
                            <div className='w-full h-[100px]'></div>
                        </Col>
                        <Col className="px-8" xl={{ span: 24, offset: 0 }}>
                            <Routes>
                                <Route path='/' element={<Dashboard account={account} product={product.length} order={order.length} />} />
                                <Route path='/Order' element={<Order getApiOrder={getApiOrder} order={order} />} />
                                <Route path='/Product/*' element={<Product product={product} getAPIProduct={getAPIProduct} />} />
                                <Route path='/Customer' element={<Customer account={account} />} />
                            </Routes>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <SpeedDial openSpeedDial={openSpeedDial} /> */}
        </div>
    );
}