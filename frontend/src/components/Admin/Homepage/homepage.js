import React from 'react';
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
    // const [openSpeedDial, setOpenSpeedDial] = React.useState(false)

    // const handleScroll = () => {
    //     if ((window.scrollY > window.innerHeight)) {
    //         setOpenSpeedDial(true)
    //     } else {
    //         setOpenSpeedDial(false)
    //     }
    // }

    // React.useEffect(() => {
    //     window.addEventListener(
    //         "scroll",
    //         () => handleScroll(),
    //     );
    // }, []);

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
                                <Route path='/' element={<Dashboard />} />
                                <Route path='/Order' element={<Order />} />
                                <Route path='/Product/*' element={<Product />} />
                                <Route path='/Customer' element={<Customer />} />
                            </Routes>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <SpeedDial openSpeedDial={openSpeedDial} /> */}
        </div>
    );
}