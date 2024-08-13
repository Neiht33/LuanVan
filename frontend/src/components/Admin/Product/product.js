import { Col, notification, Pagination, Row, Space } from "antd";
import { Breadcrumbs, Button, ButtonGroup, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Typography, Select, Textarea, Card, Radio } from "@material-tailwind/react"
import React, { useEffect, useLayoutEffect, useState } from "react";
import img1 from '../../../img/bearbrick.png'
import { Link } from "react-router-dom";
import { AddCategory, AddProduct } from "../Add/AdminAdd";

export default function Product() {
    const TABLE_HEAD = ["Tên sản phẩm", "Danh mục", "Giá", "Đã bán", "Số lượng tồn kho", ""];
    const [api, contextHolder] = notification.useNotification();
    const [openDelete, setOpenDelete] = useState(false);
    const [currentTab, setCurrentTab] = useState('AllProduct')
    const [product, setProduct] = useState([])
    const [currentPage, setCurrentPage] = useState({
        page: 1,
        size: 10
    })

    useLayoutEffect(() => {
        getAPIProduct()
    }, [])

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

    const openNotificationError = (type) => {
        api[type]({
            message: 'Không thành công',
            description:
                'Bạn chưa điền hết thông tin sản phẩm cần thiết.',
        });
    };

    const onChangePagination = (pageNumber, pageSize) => {
        setCurrentPage({
            page: pageNumber,
            size: pageSize
        })
    };

    return (
        <Row className="pb-12">
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
                <Card className="h-full w-full overflow-scroll mt-8">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th key={head} className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${index >= 2 ? 'text-center' : ''}`}>
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
                            {product.map((product, index) => {
                                if (index >= (currentPage.page * currentPage.size - currentPage.size) && index < (currentPage.page * currentPage.size)) {
                                    return (
                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal text-start flex justify-start items-center">
                                                    <div className='product-info_img h-full w-[50px] mr-2' >
                                                        <img className='h-[50px] m-auto' src={`http://localhost:8080/images/${product.img}`} alt='anh' />
                                                    </div>
                                                    {product.name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {product.categoryName}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {formatNumber(product.price)} đ
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    {product.quantity - product.wareHouse}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    {product.quantity}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">

                                                </Typography>
                                            </td>
                                        </tr>
                                    )
                                } else
                                    if (index >= (currentPage.page * currentPage.size)) return
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-center">
                        <Pagination className="py-4" showQuickJumper defaultCurrent={1} total={product.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                    </div>
                </Card>
            </>}
            {(currentTab == 'AddProduct') && <AddProduct setCurrentTab={setCurrentTab} getAPIProduct={getAPIProduct} openNotificationSuccess={openNotificationSuccess} openNotificationError={openNotificationError} />}
            {(currentTab == 'AddCategory') && <AddCategory setCurrentTab={setCurrentTab} />}
            <>
                {contextHolder}
                <Space>
                    <Button className="hidden notifyBoxSuccess" onClick={() => openNotificationSuccess('success')}>Success</Button>
                    <Button className="hidden notifyBoxError" onClick={() => openNotificationError('error')}>Error</Button>
                </Space>
            </>
        </Row>
    );
}