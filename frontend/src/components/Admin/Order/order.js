import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card
} from "@material-tailwind/react";
import { Col, Modal, Pagination, Row, Space, Tag } from "antd";
import './order.css'
import img1 from '../../../img/bearbrick.png'
import { format } from 'date-fns-tz';
import axios from 'axios';

export default function Order({ getApiOrder, order }) {
    const [activeTab, setActiveTab] = useState("allOrder");
    const [orderDetail, setOrderDetail] = useState([])
    const [orderWaitAccept, setOrderWaitAccept] = useState([])
    const [orderPanding, setOrderPanding] = useState([])
    const [orderWaitPay, setOrderWaitPay] = useState([])
    const [orderComplete, setOrderComplete] = useState([])
    const [orderCanceled, setOrderCanceled] = useState([])
    const [orderWaitCancel, setOrderWaitCancel] = useState([])
    const TABLE_HEAD = ["Sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"];
    const [currentPage, setCurrentPage] = useState({
        page: 1,
        size: 10
    })

    const data = [
        {
            label: "Tất cả đơn hàng",
            value: "allOrder"
        },
        {
            label: "Chờ duyệt",
            value: "waitAccept"
        },
        {
            label: "Đang giao",
            value: "panding",
        },
        {
            label: "Chờ thanh toán",
            value: "waitPay",
        },
        {
            label: "Hoàn thành",
            value: "complete",
        },
        {
            label: "Đơn đã hủy",
            value: "canceled",
        },
        {
            label: "Yêu cầu hủy đơn",
            value: "waitCancel",
        }
    ];

    useEffect(() => {
        getApiOrder()
    }, [])

    useLayoutEffect(() => {
        setOrderWaitAccept(order.filter((item, index) => item.statusID == 1))
        setOrderPanding(order.filter((item, index) => item.statusID == 2))
        setOrderWaitPay(order.filter((item, index) => item.statusID == 3))
        setOrderComplete(order.filter((item, index) => item.statusID == 4))
        setOrderWaitCancel(order.filter((item, index) => item.statusID == 5))
        setOrderCanceled(order.filter((item, index) => item.statusID == 6))
    }, [order])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getApiOrderDetail = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/orderID/${id}`);
            const data = await response.json();
            if (data) {
                setOrderDetail(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const onChangePagination = (pageNumber, pageSize) => {
        setCurrentPage({
            page: pageNumber,
            size: pageSize
        })
    };

    const handleUpdateStatus = (orderID, status) => {

        const formUpdate = {
            orderID: orderID,
            status: status
        }

        axios.put(`http://localhost:8080/api/order/update`, formUpdate, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                setIsModalOpen(false);
                getApiOrder()
                console.log(response.data);
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

    const handleOpen = (id) => {
        setIsModalOpen(true);
        getApiOrderDetail(id)
    };

    return (
        <Row>
            <Typography variant="h3" className="my-8 text-start">
                Đơn Hàng
            </Typography>
            <Col xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => {
                                    setActiveTab(value)
                                    setCurrentPage({
                                        page: 1,
                                        size: 10
                                    })
                                }}
                                className={`text-lg ${activeTab === value ? "text-blue-500" : ""}`}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </Col>
            <Row className='order-title w-full mt-4 py-4'>
                <Col className='text-center' xl={{ span: 1, offset: 0 }}>#</Col>
                <Col className='text-center' xl={{ span: 3, offset: 0 }}>Mã Đơn Hàng</Col>
                <Col className='text-start' xl={{ span: 4, offset: 0 }}>Tên Khách Hàng</Col>
                <Col className='text-start' xl={{ span: 7, offset: 0 }}>Địa Chỉ</Col>
                <Col className='text-center' xl={{ span: 4, offset: 0 }}>Thời Gian</Col>
                <Col className='text-center' xl={{ span: 3, offset: 0 }}>Tổng tiền</Col>
                <Col className='text-center' xl={{ span: 2, offset: 0 }}>Trạng Thái</Col>
            </Row>
            <div className={`allOrder w-full ${activeTab == 'allOrder' ? 'block' : 'hidden'}`}>
                {order.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-center' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>#{item.orderID}</Col>
                                <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                                <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                                <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                                <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                                    {item.statusID == 1 && <div className=''>
                                        <>
                                            <Button color='blue' type="primary" onClick={() => handleOpen(item.orderID)}>
                                                Duyệt đơn
                                            </Button>
                                            <Modal footer={null} title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
                                                <DialogHeader className='flex justify-center'>
                                                    HÓA ĐƠN THANH TOÁN
                                                </DialogHeader>
                                                <DialogBody>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex items-center text-black'>
                                                            <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                                Khách hàng
                                                            </Typography>
                                                            <Typography
                                                                className="font-normal text-start"
                                                                variant="h6"
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </div>
                                                        <div className='flex items-center text-black'>
                                                            <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                                Số điện thoại
                                                            </Typography>
                                                            <Typography
                                                                className="font-normal text-start"
                                                                variant="h6"
                                                            >
                                                                {item.phoneNumber}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center text-black'>
                                                        <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                            Địa chỉ
                                                        </Typography>
                                                        <Typography
                                                            className="font-normal text-start"
                                                            variant="h6"
                                                        >
                                                            {`${item.city} - ${item.district} - ${item.address}`}
                                                        </Typography>
                                                    </div>
                                                    <div className='timeOrder text-black my-2'>
                                                        Thời gian: {formatDate(item.time)}
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
                                                                {orderDetail.map((item, index) => (
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
                                                                                {formatNumber(item.price)}
                                                                            </Typography>
                                                                        </td>
                                                                        <td className="p-4 text-center">
                                                                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                                                {formatNumber(item.quantityCurrent * item.price)}
                                                                            </Typography>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </Card>
                                                    <div className='flex justify-between items-center my-2'>
                                                        <Typography className='font-normal text-black ' variant="h4">
                                                            Tổng thanh toán
                                                        </Typography>
                                                        <Typography className='font-normal text-black ' variant="h4">
                                                            {formatNumber(item.total)} đ
                                                        </Typography>
                                                    </div>
                                                    <div className="flex gap-2 mb-8">
                                                        <Typography className='font-normal text-gray-600 text-start' variant="h6">
                                                            Phương thức thanh toán
                                                        </Typography>
                                                        <Typography
                                                            color="blue-gray"
                                                            className="flex font-medium text-blue-gray-500 flex items-center"
                                                        >
                                                            <Typography
                                                                color="blue-gray"
                                                                className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                            >
                                                                {item.paymentMethod == 1 ? 'Thanh toán khi nhận hàng' : 'Paypal'}
                                                            </Typography>
                                                        </Typography>
                                                    </div>
                                                </DialogBody>
                                                <DialogFooter className='flex justify-center'>
                                                    <Button
                                                        variant="text"
                                                        color="red"
                                                        onClick={handleOpen}
                                                        className="mr-1"
                                                    >
                                                        <span>Hủy</span>
                                                    </Button>
                                                    <Button onClick={() => handleUpdateStatus(item.orderID, 2)} className='w-[200px] text-base' color='blue' size='lg' variant="filled">
                                                        Xác nhận
                                                    </Button>
                                                </DialogFooter>
                                            </Modal>
                                        </>
                                    </div>}
                                    {item.statusID == 2 && <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="warning">Đang giao</Tag>}
                                    {item.statusID == 3 && <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="processing">Chờ thanh toán</Tag>}
                                    {item.statusID == 4 && <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="success">Hoàn thành</Tag>}
                                </Col>
                            </Row>)
                    } else
                        if (index >= (currentPage.page * currentPage.size)) return
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={order.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
            <div className={`allOrder w-full ${activeTab == 'waitAccept' ? 'block' : 'hidden'}`}>
                {orderWaitAccept.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-center' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>#{item.orderID}</Col>
                                <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                                <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                                <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                                <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                                    {item.statusID == 1 && <div className=''>
                                        <>
                                            <Button color='blue' type="primary" onClick={() => handleOpen(item.orderID)}>
                                                Duyệt đơn
                                            </Button>
                                            <Modal footer={null} title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
                                                <DialogHeader className='flex justify-center'>
                                                    HÓA ĐƠN THANH TOÁN
                                                </DialogHeader>
                                                <DialogBody>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex items-center text-black'>
                                                            <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                                Khách hàng
                                                            </Typography>
                                                            <Typography
                                                                className="font-normal text-start"
                                                                variant="h6"
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </div>
                                                        <div className='flex items-center text-black'>
                                                            <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                                Số điện thoại
                                                            </Typography>
                                                            <Typography
                                                                className="font-normal text-start"
                                                                variant="h6"
                                                            >
                                                                {item.phoneNumber}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center text-black'>
                                                        <Typography className='font-normal text-start my-2 mr-2' variant="h6">
                                                            Địa chỉ
                                                        </Typography>
                                                        <Typography
                                                            className="font-normal text-start"
                                                            variant="h6"
                                                        >
                                                            {`${item.city} - ${item.district} - ${item.address}`}
                                                        </Typography>
                                                    </div>
                                                    <div className='timeOrder text-black my-2'>
                                                        Thời gian: {formatDate(item.time)}
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
                                                                {orderDetail.map((item, index) => (
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
                                                                                {formatNumber(item.price)}
                                                                            </Typography>
                                                                        </td>
                                                                        <td className="p-4 text-center">
                                                                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                                                {formatNumber(item.quantityCurrent * item.price)}
                                                                            </Typography>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </Card>
                                                    <div className='flex justify-between items-center my-2'>
                                                        <Typography className='font-normal text-black ' variant="h4">
                                                            Tổng thanh toán
                                                        </Typography>
                                                        <Typography className='font-normal text-black ' variant="h4">
                                                            {formatNumber(item.total)} đ
                                                        </Typography>
                                                    </div>
                                                    <div className="flex gap-2 mb-8">
                                                        <Typography className='font-normal text-gray-600 text-start' variant="h6">
                                                            Phương thức thanh toán
                                                        </Typography>
                                                        <Typography
                                                            color="blue-gray"
                                                            className="flex font-medium text-blue-gray-500 flex items-center"
                                                        >
                                                            <Typography
                                                                color="blue-gray"
                                                                className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                            >
                                                                {item.paymentMethod == 1 ? 'Thanh toán khi nhận hàng' : 'Paypal'}
                                                            </Typography>
                                                        </Typography>
                                                    </div>
                                                </DialogBody>
                                                <DialogFooter className='flex justify-center'>
                                                    <Button
                                                        variant="text"
                                                        color="red"
                                                        onClick={handleOpen}
                                                        className="mr-1"
                                                    >
                                                        <span>Hủy</span>
                                                    </Button>
                                                    <Button onClick={() => handleUpdateStatus(item.orderID, 2)} className='w-[200px] text-base' color='blue' size='lg' variant="filled">
                                                        Xác nhận
                                                    </Button>
                                                </DialogFooter>
                                            </Modal>
                                        </>
                                    </div>}
                                </Col>
                            </Row>
                        )
                    }
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={orderWaitAccept.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
            <div className={`allOrder w-full ${activeTab == 'panding' ? 'block' : 'hidden'}`}>
                {orderPanding.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row key={index} className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-center' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>#{item.orderID}</Col>
                                <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                                <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                                <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                                <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                                    {item.statusID == 2 && <>
                                        <Space>
                                            <Button
                                                type="primary"
                                                variant="text"
                                                className='p-0 font-normal normal-case'
                                                onClick={() => {
                                                    Modal.confirm({
                                                        title: 'Confirm',
                                                        content: 'Đơn hàng đã được chuyển đến?',
                                                        onOk: () => handleUpdateStatus(item.orderID, 3),
                                                        footer: (_, { OkBtn, CancelBtn }) => (
                                                            <>
                                                                <CancelBtn />
                                                                <OkBtn />
                                                            </>
                                                        ),
                                                    });
                                                }}
                                            >
                                                <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="warning">Đang giao</Tag>
                                            </Button>
                                        </Space>
                                    </>}
                                    {item.statusID == 3 && <div>
                                        <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="warning">Đang giao</Tag>
                                    </div>}
                                </Col>
                            </Row>
                        )
                    }
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={orderPanding.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
            <div className={`allOrder w-full ${activeTab == 'waitPay' ? 'block' : 'hidden'}`}>
                {orderWaitPay.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-center' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>#{item.orderID}</Col>
                                <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                                <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                                <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                                <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                                    <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="processing">Chờ thanh toán</Tag>
                                </Col>
                            </Row>
                        )
                    }
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={orderWaitPay.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
            <div className={`allOrder w-full ${activeTab == 'complete' ? 'block' : 'hidden'}`}>
                {orderComplete.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-center' xl={{ span: 1, offset: 0 }}>{index + 1}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>#{item.orderID}</Col>
                                <Col className='text-start' xl={{ span: 4, offset: 0 }}>{item.name}</Col>
                                <Col className='text-start' xl={{ span: 7, offset: 0 }}>{`${item.city} - ${item.district} - ${item.address}`}</Col>
                                <Col className='text-center' xl={{ span: 4, offset: 0 }}>{formatDate(item.time)}</Col>
                                <Col className='text-center' xl={{ span: 3, offset: 0 }}>{formatNumber(item.total)}</Col>
                                <Col className='text-center' xl={{ span: 2, offset: 0 }}>
                                    <Tag className='rounded-full w-full flex justify-center py-1 px-2 text-sm border-none' color="success">Hoàn thành</Tag>
                                </Col>
                            </Row>
                        )
                    }
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={orderComplete.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
            <div className={`allOrder w-full ${activeTab == 'waitCancel' ? 'block' : 'hidden'}`}>
                {orderWaitCancel.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-start' xl={{ span: 1, offset: 0 }}>1</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>#2012259</Col>
                                <Col className='text-start' xl={{ span: 6, offset: 0 }}>
                                    <div className='product-info h-full flex items-center'>
                                        <div className='product-info_img h-full w-[50px] mr-4'>
                                            <img className='h-[50px] m-auto' src={img1} alt='anh' />
                                        </div>
                                        <Typography className='font-normal' variant="h6">
                                            Bear Brick
                                        </Typography>
                                    </div>
                                </Col>
                                <Col className='text-start' xl={{ span: 6, offset: 0 }}>P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>7/11/2024</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>325.000đ</Col>
                                <Col className='text-start' xl={{ span: 2, offset: 0 }}>
                                    <Button color="red">Duyệt yêu cầu</Button>
                                </Col>
                            </Row>
                        )
                    }
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={orderCanceled.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
            <div className={`allOrder w-full ${activeTab == 'canceled' ? 'block' : 'hidden'}`}>
                {orderCanceled.map((item, index) => {
                    if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                        return (
                            <Row className={`order-title w-full h-[88px] py-4 flex items-center ${index % 2 == 0 ? 'bg-white' : ''}`}>
                                <Col className='text-start' xl={{ span: 1, offset: 0 }}>1</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>#2012259</Col>
                                <Col className='text-start' xl={{ span: 6, offset: 0 }}>
                                    <div className='product-info h-full flex items-center'>
                                        <div className='product-info_img h-full w-[50px] mr-4'>
                                            <img className='h-[50px] m-auto' src={img1} alt='anh' />
                                        </div>
                                        <Typography className='font-normal' variant="h6">
                                            Bear Brick
                                        </Typography>
                                    </div>
                                </Col>
                                <Col className='text-start' xl={{ span: 6, offset: 0 }}>P.An Khánh, Q.Ninh Kiều, TP.Cần Thơ</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>7/11/2024</Col>
                                <Col className='text-start' xl={{ span: 3, offset: 0 }}>325.000đ</Col>
                                <Col className='text-start' xl={{ span: 2, offset: 0 }}>
                                    <Button color="red">Duyệt yêu cầu</Button>
                                </Col>
                            </Row>
                        )
                    }
                })}
                <div className="flex justify-center">
                    <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={orderWaitCancel.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                </div>
            </div>
        </Row>
    );
}