import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Collapse, Input, Rating, Tab, Tabs, TabsHeader, Textarea, Typography } from "@material-tailwind/react";
import { Col, Modal, Rate, Row, Space } from "antd";
import { format } from 'date-fns-tz';
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

export default function UserOrder({ language, user }) {

    const [activeTab, setActiveTab] = useState("allOrder");
    const [order, setOrder] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const productRate = useRef([]);
    const data = [
        {
            label: "Tất cả đơn hàng",
            value: "allOrder"
        },
        {
            label: "Chờ duyệt",
            value: "wailAccept",
        },
        {
            label: "Vận chuyển",
            value: "transport",
        },
        {
            label: "Chờ thanh toán",
            value: "waitPay"
        },
        {
            label: "Hoàn thành",
            value: "complete",
        },
        {
            label: "Đơn đã hủy",
            value: "canceled",
        }
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            getApiOrder(user.id)
            getApiOrderDetail(user.id)
        }
    }, [user])

    useEffect(() => {
        productDetail.forEach((item, index) => {
            const rated = document.querySelector(`.rated-${index}`)
            const feedback = document.querySelector(`.feedback-${index}`)
            if (rated && feedback) {
                if (item.ratedStatus == 1) {
                    rated.classList.add('hidden')
                    feedback.textContent = 'Đã đánh giá'
                }
            }
        })
    }, [productDetail])

    const showModal = (id) => {
        getApiOrderDetailByOrderID(id)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getApiOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/account/${id}`);
            const data = await response.json();
            if (data) {
                setOrder(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiOrderDetail = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/accountID/${id}`);
            const data = await response.json();
            if (data) {
                setOrderDetail(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiOrderDetailByOrderID = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/orderID/${id}`);
            const data = await response.json();
            if (data) {
                setProductDetail(data)
                data.forEach((item, index) => {
                    productRate.current.push({ rated: 5, comment: '' })
                })
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const handleReceived = (orderID, status, paymentStatus) => {

        const formUpdate = {
            orderID: orderID,
            status: status,
            paymentStatus: paymentStatus
        }

        axios.put(`http://localhost:8080/api/order/update`, formUpdate, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                getApiOrder(user.id)
                console.log(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    }

    const handleComment = (productID, position, orderID) => {
        const formSubmit = {
            accountID: user.id,
            productID: productID,
            rated: productRate.current[position].rated,
            comment: productRate.current[position].comment,
            orderID: orderID
        }

        axios.post(`http://localhost:8080/api/rated`, formSubmit, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                const rated = document.querySelector(`.rated-${position}`)
                const feedback = document.querySelector(`.feedback-${position}`)
                rated.classList.add('hidden')
                feedback.textContent = 'Cảm ơn bạn đã đánh giá sản phẩm này'
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });

    }

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

    function removeVietnameseAccents(str) {
        if (str) {
            let withoutAccents = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            // Thay thế khoảng trắng bằng dấu gạch ngang
            return withoutAccents.replace(/\s+/g, '-');
        }
    }

    return (
        <>
            <Row className="p-4 bg-white">
                <Col xl={{ span: 24, offset: 0 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Tabs value={activeTab}>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-full"
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
                                    className={`md:text-lg text-sm ${activeTab === value ? "text-blue-500" : ""}`}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </Col>
            </Row>
            {activeTab == 'allOrder' && order.map((item, index) => (
                <div className="mb-4 bg-white px-4">
                    <div className="flex justify-between items-center py-4 border-y-zinc-950 border-b-2 my-2"  >
                        <div>
                            {formatDate(item.time)}
                        </div>
                        <div className="flex items-center text-blue-700 text-base font-lg">
                            {item.statusID == 1 && <div className="flex items-center text-base">
                                <span className="pr-2">{item.status}</span>
                                {item.paymentStatus === 0 && <>
                                    <Space>
                                        <Button
                                            type="primary"
                                            variant="text"
                                            className='p-0 font-normal normal-case hover:bg-transparent rounded-none'
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: 'Confirm',
                                                    content: `${language == 1 ? 'Xác nhận hủy đơn hàng?' : 'You want to cancel your order?'}`,
                                                    onOk: () => handleReceived(item.orderID, 5, 0),
                                                    footer: (_, { OkBtn, CancelBtn }) => (
                                                        <>
                                                            <CancelBtn />
                                                            <OkBtn />
                                                        </>
                                                    ),
                                                });
                                            }}
                                        >
                                            <span className="text-red-500 text-base pl-2 border-l-2 border-l-gray-300 hover:cursor-pointer">Hủy đơn</span>
                                        </Button>
                                    </Space>
                                </>}
                            </div>}
                            {(item.statusID == 2) ? item.status : ''}
                            {item.statusID == 3 && <Button color="blue" onClick={() => handleReceived(item.orderID, 4, 1)}>Đã nhận hàng</Button>}
                            {item.statusID == 4 && <>
                                <Typography variant="h6" color="green" className="font-normal border-r-2 border-r-gray-300 px-2 mr-2">
                                    Đơn hàng đã được giao thành công
                                </Typography>
                                <Button className="bg-red-600" type="primary" onClick={() => showModal(item.orderID)}>
                                    Đánh giá
                                </Button>
                            </>}
                            {item.statusID == 5 ? <div className="text-red-500">{language == 1 ? 'Chờ duyệt yêu cầu hủy đơn' : 'Waiting for cancellation request approval'}</div> : ''}
                            {item.statusID == 6 ? <div className="text-red-500">{language == 1 ? 'Đã hủy' : 'Canceled'}</div> : ''}
                        </div>
                    </div>
                    <div className="px-8">
                        {orderDetail.map((product, index) => {
                            if (product.orderID == item.orderID) {
                                return (
                                    <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                        e.preventDefault()
                                        window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                                    }}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center w-9/12">
                                                <div className="md:w-[100px] md:h-[100px] w-[100px] h-[100px] mr-2">
                                                    <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                                </div>
                                                <span className="cart-itemName w-9/12">{product.name}</span>
                                            </div>
                                            <div className="cart-info text-end">
                                                <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                                <div>x {product.quantityCurrent}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        <Typography variant="h5" className="text-red-500 px-2 text-end py-4">
                            Tổng tiền: {formatNumber(item.total)} đ
                        </Typography>
                    </div>
                </div>
            ))}
            {activeTab == 'wailAccept' && order.map((item, index) => {
                if (item.statusID == 1 || item.statusID == 5) {
                    return (
                        <div className="mb-4 bg-white px-4">
                            <div className="flex justify-between items-center py-4 border-y-zinc-950 border-b-2 my-2"  >
                                <div>
                                    {formatDate(item.time)}
                                </div>
                                <div className="flex items-center text-blue-700 text-base font-lg">
                                    {item.statusID == 1 && <div className="flex items-center text-base">
                                        <span className="pr-2">{item.status}</span>
                                        {item.paymentStatus === 0 && <>
                                            <Space>
                                                <Button
                                                    type="primary"
                                                    variant="text"
                                                    className='p-0 font-normal normal-case hover:bg-transparent rounded-none'
                                                    onClick={() => {
                                                        Modal.confirm({
                                                            title: 'Confirm',
                                                            content: `${language == 1 ? 'Xác nhận hủy đơn hàng?' : 'You want to cancel your order?'}`,
                                                            onOk: () => handleReceived(item.orderID, 5, 0),
                                                            footer: (_, { OkBtn, CancelBtn }) => (
                                                                <>
                                                                    <CancelBtn />
                                                                    <OkBtn />
                                                                </>
                                                            ),
                                                        });
                                                    }}
                                                >
                                                    <span className="text-red-500 text-base pl-2 border-l-2 border-l-gray-300 hover:cursor-pointer">Hủy đơn</span>
                                                </Button>
                                            </Space>
                                        </>}
                                    </div>}
                                    {item.statusID == 5 ? <div className="text-red-500">{language == 1 ? 'Chờ duyệt yêu cầu hủy đơn' : 'Waiting for cancellation request approval'}</div> : ''}
                                </div>
                            </div>
                            <div className="px-8">
                                {orderDetail.map((product, index) => {
                                    if (product.orderID == item.orderID) {
                                        return (
                                            <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                                e.preventDefault()
                                                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                                            }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center w-9/12">
                                                        <div className="w-[100px] h-[100px] mr-2">
                                                            <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                                        </div>
                                                        <span className="cart-itemName">{product.name}</span>
                                                    </div>
                                                    <div className="cart-info text-end">
                                                        <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                                        <div>x {product.quantityCurrent}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                <Typography variant="h5" className="text-red-500 px-2 text-end py-4">
                                    Tổng tiền: {formatNumber(item.total)} đ
                                </Typography>
                            </div>
                        </div>
                    )
                }
            })}
            {activeTab == 'transport' && order.map((item, index) => {
                if (item.statusID == 2) {
                    return (
                        <div className="mb-4 bg-white px-4">
                            <div className="flex justify-between items-center py-4 border-y-zinc-950 border-b-2 my-2"  >
                                <div>
                                    {formatDate(item.time)}
                                </div>
                                <div className="flex items-center text-blue-700 text-base font-lg">
                                    {item.status}
                                </div>
                            </div>
                            <div className="px-8">
                                {orderDetail.map((product, index) => {
                                    if (product.orderID == item.orderID) {
                                        return (
                                            <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                                e.preventDefault()
                                                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                                            }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center w-9/12">
                                                        <div className="w-[100px] h-[100px] mr-2">
                                                            <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                                        </div>
                                                        <span className="cart-itemName">{product.name}</span>
                                                    </div>
                                                    <div className="cart-info text-end">
                                                        <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                                        <div>x {product.quantityCurrent}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                <Typography variant="h5" className="text-red-500 px-2 text-end py-4">
                                    Tổng tiền: {formatNumber(item.total)} đ
                                </Typography>
                            </div>
                        </div>
                    )
                }
            })}
            {activeTab == 'waitPay' && order.map((item, index) => {
                if (item.statusID == 3) {
                    return (
                        <div className="mb-4 bg-white px-4">
                            <div className="flex justify-between items-center py-4 border-y-zinc-950 border-b-2 my-2"  >
                                <div>
                                    {formatDate(item.time)}
                                </div>
                                <div className="flex items-center text-blue-700 text-base font-lg">
                                    <Button color="blue" onClick={() => handleReceived(item.orderID, 4, 1)}>Đã nhận hàng</Button>
                                </div>
                            </div>
                            <div className="px-8">
                                {orderDetail.map((product, index) => {
                                    if (product.orderID == item.orderID) {
                                        return (
                                            <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                                e.preventDefault()
                                                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                                            }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center w-9/12">
                                                        <div className="w-[100px] h-[100px] mr-2">
                                                            <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                                        </div>
                                                        <span className="cart-itemName">{product.name}</span>
                                                    </div>
                                                    <div className="cart-info text-end">
                                                        <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                                        <div>x {product.quantityCurrent}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                <Typography variant="h5" className="text-red-500 px-2 text-end py-4">
                                    Tổng tiền: {formatNumber(item.total)} đ
                                </Typography>
                            </div>
                        </div>
                    )
                }
            })}
            {activeTab == 'complete' && order.map((item, index) => {
                if (item.statusID == 4) {
                    return (
                        <div className="mb-4 bg-white px-4">
                            <div className="flex justify-between items-center py-4 border-y-zinc-950 border-b-2 my-2"  >
                                <div>
                                    {formatDate(item.time)}
                                </div>
                                <div className="flex items-center text-blue-700 text-base font-lg">
                                    <Typography variant="h6" color="green" className="font-normal border-r-2 border-r-gray-300 px-2 mr-2">
                                        Đơn hàng đã được giao thành công
                                    </Typography>
                                    {item.ratedStatus != 1 ? <Button className="bg-red-600" type="primary" onClick={() => showModal(item.orderID)}>
                                        Đánh giá
                                    </Button> : <div className="text-red-300">Đã đánh giá</div>}
                                </div>
                            </div>
                            <div className="px-8">
                                {orderDetail.map((product, index) => {
                                    if (product.orderID == item.orderID) {
                                        return (
                                            <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                                e.preventDefault()
                                                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                                            }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center w-9/12">
                                                        <div className="w-[100px] h-[100px] mr-2">
                                                            <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                                        </div>
                                                        <span className="cart-itemName">{product.name}</span>
                                                    </div>
                                                    <div className="cart-info text-end">
                                                        <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                                        <div>x {product.quantityCurrent}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                <Typography variant="h5" className="text-red-500 px-2 text-end py-4">
                                    Tổng tiền: {formatNumber(item.total)} đ
                                </Typography>
                            </div>
                        </div>
                    )
                }
            })}
            {activeTab == 'canceled' && order.map((item, index) => {
                if (item.statusID == 6) {
                    return (
                        <div className="mb-4 bg-white px-4">
                            <div className="flex justify-between items-center py-4 border-y-zinc-950 border-b-2 my-2"  >
                                <div>
                                    {formatDate(item.time)}
                                </div>
                                <div className="flex items-center text-blue-700 text-base font-lg">
                                    <div className="text-red-500">{language == 1 ? 'Đã hủy' : 'Canceled'}</div>
                                </div>
                            </div>
                            <div className="px-8">
                                {orderDetail.map((product, index) => {
                                    if (product.orderID == item.orderID) {
                                        return (
                                            <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                                e.preventDefault()
                                                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                                            }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center w-9/12">
                                                        <div className="w-[100px] h-[100px] mr-2">
                                                            <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                                        </div>
                                                        <span className="cart-itemName">{product.name}</span>
                                                    </div>
                                                    <div className="cart-info text-end">
                                                        <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                                        <div>x {product.quantityCurrent}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                <Typography variant="h5" className="text-red-500 px-2 text-end py-4">
                                    Tổng tiền: {formatNumber(item.total)} đ
                                </Typography>
                            </div>
                        </div>
                    )
                }
            })}
            <Modal title="Đánh giá sản phẩm" width='800px' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {productDetail.map((product, index) => (
                    <div className="border-2 border-gray-500 my-4 rounded p-2">
                        <div key={index} className="text-black py-2 border-b-2 border-b-stone-950 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`
                        }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center w-9/12">
                                    <div className="w-[100px] h-[100px] mr-2">
                                        <img className="w-full h-full" src={`http://localhost:8080/images/${product.img}`} />
                                    </div>
                                    <span className="cart-itemName">{product.name}</span>
                                </div>
                                <div className="cart-info text-end">
                                    <div className="flex text-red-500 text-lg">{formatNumber(product.price)} đ</div>
                                    <div>x {product.quantityCurrent}</div>
                                </div>
                            </div>
                        </div>
                        <div className={`rated-${index}`}>
                            <div className="flex items-center py-2">
                                Đánh giá: <Rate allowHalf defaultValue={5} className='ml-2' onChange={(value) => {
                                    productRate.current[index].rated = value
                                }} />

                            </div>
                            <div className="w-full py-2">
                                <TextArea rows={4} className='py-2' onChange={(value) => {
                                    productRate.current[index].comment = value.target.value
                                }} />
                            </div>
                            <div className="flex justify-end">
                                <Button className="w-32" color="blue" onClick={() => handleComment(product.productID, index, product.orderID)}>Gửi</Button>
                            </div>
                        </div>
                        <div className={`feedback-${index} text-green-300 text-base`}></div>
                    </div>
                )
                )}
            </Modal>
        </>
    );
}