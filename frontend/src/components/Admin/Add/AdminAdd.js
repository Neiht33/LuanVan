import React, { useLayoutEffect, useRef, useState } from "react";
import axios from 'axios';
import { Breadcrumbs, Button, Card, Input, Option, Radio, Select, Textarea, Typography, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Col, Image, InputNumber, notification, Row, Space, Upload } from "antd";
import { Link } from "react-router-dom";
import FormList from "antd/es/form/FormList";

export function AddProduct({ setCurrentTab, getAPIProduct, openNotificationSuccess }) {
    const [api, contextHolder] = notification.useNotification();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileIMG, setFileIMG] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [category, setCategory] = useState([])
    const [selectedOptionAge, setSelectedOptionAge] = useState();
    const [selectedOptionCategory, setSelectedOptionCategory] = useState();
    const [selectedOptionGender, setSelectedOptionGender] = useState(0);
    const [priceValue, setPriceValue] = useState('');
    var [productForm, setProductForm] = useState({
        name: '',
        img: '',
        price: '',
        quantity: '',
        age: '',
        category: '',
        description: '',
        gender: '',
        listFileImage: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
    })

    useLayoutEffect(() => {
        getApiDataCategory()
    }, [])

    const handlePreview = async (file) => {
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        if (newFileList.length != 0) {
            setFileIMG(newFileList[newFileList.length - 1].originFileObj);
        }

    };

    const handleChangeList = ({ fileList: newFileList }) => {
        if (newFileList.length != 0) {
            setProductForm((prev) => ({
                ...prev,
                [`img${newFileList.length}`]: newFileList[newFileList.length - 1].originFileObj
            }))
            setFileList(newFileList)
        }
    };

    const handleSubmitProduct = () => {
        const productName = document.querySelector('.productName')
        const productQuantity = document.querySelector('.productQuantity')
        const productPrice = document.querySelector('.productPrice')
        const productDescription = document.querySelector('.productDescription')

        // Chuyển giá trị xuống dòng của Description thành html
        var formattedContent = productDescription.value.replace(/\n/g, '<br>');

        const formSubmit = {
            ...productForm,
            name: productName.value,
            img: fileIMG,
            price: Number(productPrice.value.replace(/\./g, '')),
            quantity: Number(productQuantity.value),
            age: Number(selectedOptionAge),
            category: Number(selectedOptionCategory),
            description: formattedContent,
            gender: selectedOptionGender
        }

        axios.post(`http://localhost:8080/api/products`, formSubmit, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);
                getAPIProduct()
                openNotificationSuccess('success')
                // document.querySelector('.notifyBoxSuccess').click()
                setCurrentTab('AllProduct')
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });

    }

    function formatNumber(number) {
        // Chuyển số thành chuỗi và đảo ngược chuỗi
        number = number.replace(/[a-zA-Z.]/g, '');
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

    const handleInputChange = (e) => {
        const value = e.target.value
        setPriceValue(formatNumber(value))
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

    return (
        <div className="w-full">
            <Breadcrumbs>
                <Link to={'/Admin/Product'} onClick={() => setCurrentTab('AllProduct')} className="opacity-60">
                    Tất cả sản phẩm
                </Link>
                <Link to={'/Admin/Product'} className="opacity-60">
                    Thêm sản phẩm
                </Link>
            </Breadcrumbs>
            <Row className="w-full bg-white rounded py-8">
                <Col xl={{ span: 11, offset: 1 }}>
                    <div className="mb-8">
                        <Input className="productName" label="Tên sản phẩm" />
                    </div>
                    <div className="mb-8 flex justify-between items-center">
                        <div className="w-[100px]">
                            <input className="productQuantity max-w-[100px] h-[40px] py-[10px] px-[12px] rounded-[7px]" style={{ border: '1px solid #b0bec5' }} placeholder="Số lượng" />
                        </div>
                        <div className="">
                            <input className="productPrice h-[40px] py-[10px] px-[12px] rounded-[7px]" value={priceValue} onChange={handleInputChange} style={{ border: '1px solid #b0bec5' }} placeholder="Giá" />
                        </div>
                        <div className="">
                            <Select onChange={setSelectedOptionAge} label="Nhóm Tuổi">
                                <Option value="1">1 - 3</Option>
                                <Option value="2">3 - 6</Option>
                                <Option value="3">6 - 12</Option>
                                <Option value="4">Trên 12 tuổi</Option>
                                <Option value="0">Mọi lứa tuổi</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="mb-8">
                        <Select onChange={setSelectedOptionCategory} label="Danh mục">
                            {category.map((item, index) => {
                                return (
                                    <Option value={`${index + 1}`} key={index}>{item.name}</Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div>
                        <Textarea className="productDescription" label="Mô tả" />
                    </div>
                </Col>
                <Col xl={{ span: 11, offset: 1 }}>
                    <div className="productGender flex justify-between items-center pr-16">
                        Nhóm giới tính:
                        <Radio onClick={() => setSelectedOptionGender(1)} name="gender" label="Nam" />
                        <Radio onClick={() => setSelectedOptionGender(2)} name="gender" label="Nữ" />
                        <Radio onClick={() => setSelectedOptionGender(0)} name="gender" label="Cả 2" defaultChecked />
                    </div>
                    <div className="flex items-center my-4">
                        Ảnh chính của sản phẩm:
                        <>
                            <Upload
                                className="ml-4"
                                maxCount={1}
                                action='http://localhost:8080 '
                                listType="picture-card"
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Tải ảnh lên
                                    </div>
                                </button>
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </>
                    </div>
                    <div className="flex items-center my-4">
                        Ảnh thêm cho sản phẩm:
                        <>
                            <Upload
                                className="ml-4"
                                action='http://localhost:8080'
                                listType="picture-card"
                                onPreview={handlePreview}
                                onChange={handleChangeList}
                            >
                                {fileList.length >= 5 ? null : <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Tải ảnh lên
                                    </div>
                                </button>}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </>
                    </div>
                    <Button className="float-right m-8" color="blue" onClick={() => handleSubmitProduct()}>Đăng sản phẩm</Button>
                </Col>
            </Row>
        </div>
    );
}

export function AddCategory({ setCurrentTab }) {
    const TABLE_HEAD = ["Danh Mục", "Nhóm Danh Mục", "Tùy Chỉnh", ""];

    const [selectedOption, setSelectedOption] = useState();
    const [category, setCategory] = useState([])
    const [api, contextHolder] = notification.useNotification();
    const [active, setActive] = useState(1);
    var [categoryForm, setCategoryForm] = useState({
        name: '',
        group: '',
    })


    const next = () => {
        if (active === Math.ceil(category.length / 5)) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    useLayoutEffect(() => {
        getApiDataCategory()
    }, [])

    const openNotificationWithIconSuccess = (type) => {
        api[type]({
            message: 'Thêm thành công',
            description:
                'Danh mục đã được đăng lên trang chủ',
        });
    };

    const openNotificationWithIconError = (type) => {
        api[type]({
            message: 'Không thành công',
            description:
                'Bạn chưa nhập danh mục hoặc danh mục đã tồn tại',
        });
    };

    const handleCategorySubmit = () => {
        const categoryName = document.querySelector('.categoryName')
        console.log(selectedOption);

        for (var i = 0; i < category.length; i++) {
            if ((categoryName.value == '') || (categoryName.value.toUpperCase() === category[i].name.toUpperCase())) {
                document.querySelector('.notifyBoxError').click()
                return;
            }
        }

        categoryForm = {
            name: `${categoryName.value}`,
            group: selectedOption
        }

        fetch(`http://localhost:8080/api/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryForm)
        })
            .then(response => response.json())
            .then(result => {
                getApiDataCategory()
                setCategoryForm('')
                categoryName.value = ''
                setSelectedOption('')
                document.querySelector('.notifyBoxSuccess').click()
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            })

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

    return (
        <div className="w-full">
            <Breadcrumbs>
                <Link to={'/Admin/Product'} onClick={() => setCurrentTab('AllProduct')} className="opacity-60">
                    Tất cả sản phẩm
                </Link>
                <Link to={'/Admin/Product'} className="opacity-60">
                    Thêm danh mục
                </Link>
            </Breadcrumbs>
            <Row className="w-full bg-white rounded py-8">
                <Col xl={{ span: 11, offset: 1 }}>
                    <div className="mb-8">
                        <Input required className="categoryName" label="Tên danh mục" />
                    </div>
                    <div className="mb-8">
                        <Select className="categoryGroup" value={selectedOption} onChange={setSelectedOption} aria-required label="Thuộc nhóm danh mục">
                            <Option value="1">Đồ Chơi</Option>
                            <Option value="2">Phương Tiện Di Chuyển</Option>
                        </Select>
                    </div>
                    <div className="float-end">
                        <Button className="w-[100px]" color="blue" onClick={() => handleCategorySubmit()}>Lưu</Button>
                    </div>
                </Col>
                <Col xl={{ span: 11, offset: 1 }}>
                    <Card className="h-full w-full overflow-scroll ">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
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
                                {category.map(({ name, group }, index) => {
                                    const isLast = index === category.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    if (index >= (active * 5 - 5) && index < (active * 5)) {
                                        return (
                                            <tr key={name}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {group == 1 ? 'Đồ Chơi' : 'Phương Tiện Di Chuyển'}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium"
                                                    >
                                                        Edit
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    } else
                                        if (index >= (active * 5)) return;
                                })}
                            </tbody>
                        </table>
                        <div className="flex items-center gap-8 mt-6">
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={prev}
                                disabled={active === 1}
                            >
                                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                            <Typography color="gray" className="font-normal">
                                Page <strong className="text-gray-900">{active}</strong> of{" "}
                                <strong className="text-gray-900">{Math.ceil(category.length / 5)}</strong>
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={next}
                                disabled={active === Math.ceil(category.length / 5)}
                            >
                                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                        </div>
                    </Card>
                </Col>
            </Row>
            <>
                {contextHolder}
                <Space>
                    <Button className="hidden notifyBoxSuccess" onClick={() => openNotificationWithIconSuccess('success')}>Success</Button>
                    <Button className="hidden notifyBoxError" onClick={() => openNotificationWithIconError('error')}>Error</Button>
                </Space>
            </>
        </div>
    );
}
