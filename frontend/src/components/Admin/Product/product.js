import { Col, InputNumber, notification, Pagination, Row, Space } from "antd";
import { Breadcrumbs, Button, ButtonGroup, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Typography, Select, Textarea, Card, Radio } from "@material-tailwind/react"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import img1 from '../../../img/bearbrick.png'
import { Link } from "react-router-dom";
import { AddCategory, AddProduct, Discount } from "../Add/AdminAdd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function Product({ product, setProduct, getAPIProduct }) {
    const TABLE_HEAD = ["Tên sản phẩm", "Danh mục", "Giá", "Đã bán", "Số lượng tồn kho", ""];
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([])
    const [selectedOptionCategory, setSelectedOptionCategory] = useState();
    const [api, contextHolder] = notification.useNotification();
    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [wareHouse, setWareHouse] = useState('');
    const [currentTab, setCurrentTab] = useState('AllProduct')
    const [currentPage, setCurrentPage] = useState({
        page: 1,
        size: 10
    })

    var productForm = useRef({})

    useLayoutEffect(() => {
        getAPIProduct()
        getApiDataCategory()
    }, [])

    function formatNumber(number) {
        // Chuyển số thành chuỗi và đảo ngược chuỗi
        number = String(number).replace(/[a-zA-Z.]/g, '');
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

    const handlePriceChange = (e) => {
        const value = e.target.value
        setPriceValue(formatNumber(value))
    }

    const handleChangeDescription = (e) => {
        const value = e.target.value
        setDescriptionValue(value)
    }

    const handleChangeWareHouse = (e) => {
        const value = e.target.value
        setWareHouse(formatNumber(value))
    }

    const handleUpdate = (oldWareHouse) => {
        const formUpdate = {
            id: productForm.current.id,
            name: nameValue,
            category: productForm.current.category,
            price: priceValue.replace(/\./g, ''),
            description: descriptionValue.replace(/\n/g, '<br>'),
            oldWareHouse: oldWareHouse,
            newWareHouse: wareHouse.replace(/\./g, '')
        }

        axios.put(`http://localhost:8080/api/products/updateProduct`, formUpdate, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);
                openNotificationSuccessUpdate('success')
                getAPIProduct()
                setOpen(false)
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });

    }

    const getApiProductBySeekPage = async (seek) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/Adminseek/main?seek=${seek}`);
            const data = await response.json();
            if (data) {
                setProduct(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiDataCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/category`);
            const data = await response.json();
            if (data) {
                setCategory(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    };

    const openNotificationSuccess = (type) => {
        api[type]({
            message: 'Thêm thành công',
            description:
                'Sản phẩm đã được đăng lên trang',
        });
    };

    const openNotificationSuccessUpdate = (type) => {
        api[type]({
            message: 'Cập nhật thành công',
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

    const openNotificationDiscountSuccess = (type) => {
        api[type]({
            message: 'Sản phẩm đã được cập nhật'
        });
    };

    const handleSearch = debounce((value) => {
        setCurrentPage({
            page: 1,
            size: 10
        })
        getApiProductBySeekPage(value)
    }, 500)

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

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
                    <Button className="flex items-center justify-center" onClick={() => setCurrentTab('AddProduct')}>
                        <svg className="text-lg mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>
                        THÊM SẢN PHẨM
                    </Button>
                    <Button className="flex items-center justify-center" onClick={() => setCurrentTab('AddCategory')}>
                        <svg className="text-lg mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>
                        THÊM DANH MỤC
                    </Button>
                    <Button className="flex items-center justify-center" onClick={() => setCurrentTab('Discount')} color="black" variant="filled">
                        <svg className="text-lg mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M13.946 2.094a3 3 0 0 0-3.892 0L8.706 3.243a1 1 0 0 1-.569.236l-1.765.14A3 3 0 0 0 3.62 6.371l-.14 1.766a1 1 0 0 1-.237.569l-1.148 1.348a3 3 0 0 0 0 3.891l1.148 1.349a1 1 0 0 1 .236.569l.141 1.765a3 3 0 0 0 2.752 2.752l1.765.14a1 1 0 0 1 .57.237l1.347 1.148a3 3 0 0 0 3.892 0l1.348-1.148a1 1 0 0 1 .57-.236l1.765-.141a3 3 0 0 0 2.752-2.752l.14-1.765a1 1 0 0 1 .236-.57l1.149-1.347a3 3 0 0 0 0-3.892l-1.149-1.348a1 1 0 0 1-.236-.57l-.14-1.765a3 3 0 0 0-2.752-2.752l-1.766-.14a1 1 0 0 1-.569-.236zm.882 5.663l1.415 1.414l-7.071 7.072l-1.415-1.415zm-4.596 2.475a1.5 1.5 0 1 1-2.121-2.121a1.5 1.5 0 0 1 2.121 2.121m3.536 5.657a1.5 1.5 0 1 1 2.12-2.121a1.5 1.5 0 0 1-2.12 2.12"></path></svg>
                        GIẢM GIÁ
                    </Button>
                </ButtonGroup>
            </Col>
            {(currentTab == 'AllProduct') && <>
                <div className="flex justify-end w-full">
                    <div className="my-4 w-96">
                        <Input
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            label='Tìm kiếm'
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>
                <Card className="h-full w-full overflow-scroll">
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
                                                    {formatNumber(Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)} đ
                                                </Typography>
                                                {product.discount != 0 ? <div className="flex justify-center items-center">
                                                    ({product.discount}%
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#d20f0f" d="M11 4v12.175l-5.6-5.6L4 12l8 8l8-8l-1.4-1.425l-5.6 5.6V4z"></path></svg>)
                                                </div> : ''}
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    {product.quantity - product.wareHouse}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    {product.wareHouse}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-medium hover:cursor-pointer hover:text-blue-500">
                                                    <svg onClick={() => {
                                                        productForm.current = product
                                                        setOpen(true)
                                                        setNameValue(product.name)
                                                        setSelectedOptionCategory(product.categoryName)
                                                        setPriceValue(formatNumber(product.price))
                                                        setWareHouse(formatNumber(product.wareHouse))
                                                        setDescriptionValue(product.description.replace(/<br>/g, '\n'))
                                                    }} className="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="#000000" d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3z"></path>
                                                    </svg>
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
                        <Pagination className="py-4" showQuickJumper current={currentPage.page} defaultCurrent={1} total={product.length} onChange={onChangePagination} pageSizeOptions={[10, 20, 30, 50]} />
                    </div>
                </Card>
                <Dialog
                    open={open}
                    size={"md"}
                    handler={setOpen}
                >
                    <DialogHeader>Thông tin sản phẩm</DialogHeader>
                    <DialogBody>
                        <div className="">
                            Tên sản phẩm:
                            <Input onChange={(e) => setNameValue(e.target.value)} value={nameValue}></Input>
                        </div>
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="text-base my-4 flex items-center">
                                Danh mục:
                                <div className="w-[100px] ml-2">
                                    <Select selected={() => selectedOptionCategory} onChange={setSelectedOptionCategory}>
                                        {category.map((item, index) => {
                                            return (
                                                <Option value={item.name} key={index} onClick={() => productForm.current.category = item.id}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </div>
                            <div className="my-4">
                                Giá:
                                <input className="productPrice h-[40px] py-[10px] px-[12px] rounded-[7px] ml-2" value={priceValue} onChange={handlePriceChange} style={{ border: '1px solid #b0bec5' }} placeholder="Giá" />
                            </div>
                        </div>
                        <div className="">
                            Kho:
                            <input className="w-[100px] h-[40px] py-[10px] px-[12px] rounded-[7px] ml-[50px]" value={wareHouse} onChange={handleChangeWareHouse} style={{ border: '1px solid #b0bec5' }} placeholder="Số lượng" />
                        </div>
                        <div className="my-4">
                            <Textarea className="productDescription min-h-[200px]" value={descriptionValue} onChange={handleChangeDescription} label="Mô tả" />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setOpen(false)}
                            className="mr-1"
                        >
                            <span>Hủy</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={() => handleUpdate(productForm.current.wareHouse)}
                        >
                            <span>Cập nhật</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>}
            {(currentTab == 'AddProduct') && <AddProduct setCurrentTab={setCurrentTab} getAPIProduct={getAPIProduct} openNotificationSuccess={openNotificationSuccess} openNotificationError={openNotificationError} />}
            {(currentTab == 'AddCategory') && <AddCategory setCurrentTab={setCurrentTab} />}
            {(currentTab == 'Discount') && <Discount setCurrentTab={setCurrentTab} product={product} getAPIProduct={getAPIProduct} openNotificationDiscountSuccess={openNotificationDiscountSuccess} />}
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