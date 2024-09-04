import React, { useEffect, useRef, useState } from "react";
import './product.css'
import { ConfigProvider, Layout, notification, Pagination, Space, theme } from 'antd';
import { Breadcrumbs, CardFooter } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Slider } from 'antd';
import { Col, Row } from 'antd';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Radio,
    Drawer,
    Button,
    IconButton,
    Input
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon, ArrowRightIcon, ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function Product({ language, getApiCartDetail }) {
    const [open, setOpen] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openSkeleton, setOpenSkeleton] = useState(false);
    const [openPrice, setOpenPrice] = useState(true);
    const [openAge, setOpenAge] = useState(true);
    const [openGender, setOpenGender] = useState(true);
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    var totalPage = useRef(0)

    var filter = useRef({
        price: [],
        age: '',
        gender: '',
        seek: '',
        page: 1
    })

    const { Content } = Layout;

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api[type]({
            message: 'Đã thêm vào giỏ hàng',
            placement: 'top'
        });
    };

    useEffect(() => {
        getApiCategory()
        getApiProductByPage(1)
    }, [])

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleOpenPrice = (value) => {
        setOpenPrice(openPrice === true ? false : value);
    };

    const handleOpenAge = (value) => {
        setOpenAge(openAge === true ? false : value);
    };

    const handleOpenGender = (value) => {
        setOpenGender(openGender === true ? false : value);
    };

    const getApiCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/category`);
            const data = await response.json();
            if (data) {
                setCategory(data);
                totalPage.current = data.reduce((sum, item) => sum += item.quantity, 0)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductByPage = async (page) => {
        setOpenSkeleton(true)
        try {
            const response = await fetch(`http://localhost:8080/api/products/main?page=${page}`);
            const data = await response.json();
            if (data) {
                setProduct(data);
                setOpenSkeleton(false)

            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductByFilter = async () => {
        setOpenSkeleton(true)
        try {
            const response = await fetch(`http://localhost:8080/api/products/Filter/filter?${objectToQueryString(filter.current)}`);
            const data = await response.json();
            if (data) {
                if (data.length != 0) {
                    totalPage.current = data[0].total
                } else totalPage.current = 0
                setProduct(data);
                setOpenSkeleton(false)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    function objectToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        return keyValuePairs.join('&');
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

    const handleAddCart = (productID, quantity, total) => {
        const formSubmit = {
            productID: productID,
            quantity: quantity,
            total: total,
            accountID: JSON.parse(window.localStorage.getItem('User')).id
        }

        axios.put(`http://localhost:8080/api/cart`, formSubmit, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                getApiCartDetail(JSON.parse(window.localStorage.getItem('User')).id)
                openNotification('success')
                console.log(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    }

    const handleSearch = debounce((value) => {
        filter.current['seek'] = value
        filter.current.page = 1
        getApiProductByFilter()
        setCurrentPage(1)
    }, 500)

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const handleScrollUp = () => {
        window.scrollTo({
            top: 0
        });
    }

    const onChangePagination = (pageNumber, pageSize) => {
        if (filter.current.seek == '' && filter.price == null && filter.age == null && filter.gender == null) {
            getApiProductByPage(pageNumber)
            handleScrollUp()
            setCurrentPage(pageNumber)
        } else {
            filter.current.page = pageNumber
            getApiProductByFilter()
            handleScrollUp()
            setCurrentPage(pageNumber)
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{
            minHeight: '400px',
            backgroundColor: 'transparent'
        }}>
            <Content
            >
                <div className="w-full" style={{ backgroundColor: '#fff', position: 'relative' }}>
                    <Breadcrumbs style={{ backgroundColor: 'transparent' }}>
                        <Link to={'/'} className="opacity-60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </Link>
                        <Link to={'/Product'} className="opacity-60">
                            {language == 1 ? 'Tất cả sản phẩm' : 'All products'}
                        </Link>
                    </Breadcrumbs>
                </div>
                <Layout
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        backgroundColor: 'transparent',
                        flexDirection: 'unset',
                        margin: '10px 0'
                    }}
                >
                    <Card className="hidden max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none lg:block" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                        <div className="mb-2 p-4">
                            <Typography variant="h5" color="blue-gray">
                                {language == 1 ? 'Danh Mục' : 'Category'}
                            </Typography>
                        </div>
                        <div className="p-2">
                            <Input
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                label={language == 1 ? 'Tìm kiếm' : 'Search'}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <List>
                            <div className="product">
                                <Accordion
                                    open={open === 1}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === 1}>
                                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff0000" d="M3 17.2q0-.4.263-.675t.637-.275q.2 0 .388.063t.362.187q.325.2.65.35T6 17q.825 0 1.413-.587T8 15t-.587-1.412T6 13q-.375 0-.725.125t-.625.375q-.15.125-.35.188t-.4.062q-.375 0-.637-.275T3 12.8V9q0-.425.288-.712T4 8h3.75q-.125-.375-.187-.75T7.5 6.5q0-1.875 1.313-3.187T12 2t3.188 1.313T16.5 6.5q0 .375-.062.75T16.25 8H20q.425 0 .713.288T21 9v3.8q0 .425-.288.713T20 13.8q-.2 0-.35-.088t-.3-.212q-.275-.25-.625-.375T18 13q-.825 0-1.413.588T16 15t.588 1.413T18 17q.375 0 .725-.125t.625-.375q.125-.125.288-.213T20 16.2q.425 0 .713.288T21 17.2V21q0 .425-.288.713T20 22H4q-.425 0-.712-.288T3 21z"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {language == 1 ? 'Đồ Chơi' : 'Toys'}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {category.map((category, index) => {
                                                if (category.group == 1) {
                                                    return (
                                                        <Link to={`http://localhost:3000/Product/${removeVietnameseAccents(category.name)}-${category.id}`}>
                                                            <ListItem>
                                                                <ListItemPrefix>
                                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                                </ListItemPrefix>
                                                                {category.name}
                                                                <ListItemSuffix>
                                                                    <Chip value={category.quantity} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        </Link>
                                                    )
                                                }
                                            })}
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion
                                    open={open === 2}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === 2}>
                                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#eff231" fillRule="evenodd" d="M7.985 4.146a.625.625 0 0 1 .515-.271H11a.625.625 0 1 1 0 1.25H9.41l1.166 3.031a2.876 2.876 0 1 1-2.2 1.669l-.885 1.062a.622.622 0 0 1-.429.235l-1.2.15A2.875 2.875 0 1 1 3.694 8.21l.547-1.094l-.595-.991H3a.625.625 0 1 1 0-1.25h2.5a.625.625 0 1 1 0 1.25h-.396l.38.635l.009.013l1.59 2.65L8.89 7.257l-.973-2.532a.625.625 0 0 1 .068-.578Zm2.432 7.078l-.539-1.4a1.625 1.625 0 1 0 1.167-.448l.538 1.4a.625.625 0 0 1-1.166.448M9.404 8.591l.005.014a2.873 2.873 0 0 0-.038.026zm-4.4-.204l-.44.88l-.483.968l1.074-.134l.815-.102l-.967-1.612Zm-.438 3.047l-1.488.186a.625.625 0 0 1-.637-.9l.67-1.341A1.623 1.623 0 0 0 1.375 11a1.625 1.625 0 0 0 3.19.434Z" clipRule="evenodd"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {language == 1 ? 'Phương Tiện Di Chuyển' : 'Transport'}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {category.map((category, index) => {
                                                if (category.group == 2) {
                                                    return (
                                                        <Link to={`/Product/${removeVietnameseAccents(category.name)}-${category.id}`}>
                                                            <ListItem>
                                                                <ListItemPrefix>
                                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                                </ListItemPrefix>
                                                                {category.name}
                                                                <ListItemSuffix>
                                                                    <Chip value={category.quantity} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        </Link>
                                                    )
                                                }
                                            })}
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            </div>
                            <hr className="my-2 border-blue-gray-50" />
                            <div className="mb-2 p-4">
                                <Typography variant="h5" color="blue-gray">
                                    {language == 1 ? 'Bộ Lọc' : 'Filter'}
                                </Typography>
                            </div>
                            <div className="filter">
                                <Accordion
                                    open={openPrice === true}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${openPrice === true ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={openPrice === true}>
                                        <AccordionHeader onClick={() => handleOpenPrice(true)} className="border-b-0 p-3">
                                            <ListItemPrefix className="text-green-600">
                                                <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711c-.22.11-.425.218-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a15.515 15.515 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a24.574 24.574 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4.001 4.001 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4.001 4.001 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4" clipRule="evenodd"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {language == 1 ? 'Giá' : 'Price'}
                                                {/* <span className={`${priceValue <= 2000000 ? "text-green-600" : priceValue <= 5000000 ? "text-orange-500" : priceValue <= 10000000 ? "text-red-600" : "text-black"}`}>
                                                    {`${priceValue.toLocaleString('vi-VN')}đ`}
                                                </span> */}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {/* <Slider style={{ margin: '10px' }} defaultValue={0} onChange={handleChangePrice} min={0} max={10000000} step={10000} /> */}
                                            <div className="flex flex-col gap-2">
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            price: [10000, 200000]
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="price"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? 'Dưới 200.000' : '$1 - $10'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            price: [200000, 500000]
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="price"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '200.000 - 500.000' : '$10 - $20'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            price: [500000, 1000000]
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="price"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '500.000 - 1.000.000' : '$20 - $40'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            price: [1000000, 2000000]
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="price"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '1.000.000 - 2.000.000' : '$40 - $80'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            price: [2000000, 5000000]
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="price"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '2.000.000 - 5.000.000' : '$80 - $200'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            price: [5000000, 10000000]
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="price"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '5.000.000 - 10.000.000' : '$200 - $400'}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion
                                    open={openAge === true}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${openAge === true ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={openAge === true}>
                                        <AccordionHeader onClick={() => handleOpenAge(true)} className="border-b-0 p-3">
                                            <ListItemPrefix className="text-red-600">
                                                <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {language == 1 ? 'Độ Tuổi' : 'Age'}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <div className="flex flex-col gap-2 text-sm">
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            age: 1
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="age"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '1 - 3 tuổi' : 'Under 3 years old'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            age: 2
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="age"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '3 - 6 tuổi' : '3 - 6'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            age: 3
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="age"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? '6 - 12 tuổi' : '6 - 12'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            age: 4
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="age"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? 'Trên 12 tuổi' : 'Over 12 years old'}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion
                                    open={openGender === true}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${openGender === true ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={openGender === true}>
                                        <AccordionHeader onClick={() => handleOpenGender(true)} className="border-b-0 p-3">
                                            <ListItemPrefix className="text-indigo-600 ">
                                                <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#514aba" d="M208 20h-40a12 12 0 0 0 0 24h11l-15.64 15.67A68 68 0 1 0 108 178.92V192H88a12 12 0 0 0 0 24h20v16a12 12 0 0 0 24 0v-16h20a12 12 0 0 0 0-24h-20v-13.08a67.93 67.93 0 0 0 46.9-100.84L196 61v11a12 12 0 0 0 24 0V32a12 12 0 0 0-12-12m-88 136a44 44 0 1 1 44-44a44.05 44.05 0 0 1-44 44"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {language == 1 ? 'Giới Tính' : 'Gender'}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <div className="flex flex-col gap-2 text-sm">
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            gender: 1
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="indigo"
                                                    name="gender"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? 'Nam' : 'Male'}
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    onClick={() => {
                                                        filter.current = {
                                                            ...filter.current,
                                                            page: 1,
                                                            gender: 2
                                                        }
                                                        getApiProductByFilter()
                                                    }}
                                                    color="pink"
                                                    name="gender"
                                                    label={
                                                        <Typography
                                                            className="flex font-medium text-black"
                                                        >
                                                            {language == 1 ? 'Nữ' : 'Female'}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        </List>
                    </Card>
                    <Content
                        className="lg:pr-[32px] sm:pr-[32px] pr-[18px]"
                        style={{
                            minHeight: '280px',
                        }}
                    >
                        <Row>
                            {openSkeleton && <Row className="skeleton w-full">
                                <Col className="mb-8 " xl={{ span: 7, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 11, offset: 1 }}>
                                    <Card className="mt-6 w-full animate-pulse">
                                        <CardHeader
                                            shadow={false}
                                            floated={false}
                                            className="relative grid h-56 place-items-center bg-gray-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-12 w-12 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </CardHeader>
                                        <CardBody>
                                            <Typography
                                                as="div"
                                                variant="h1"
                                                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                        </CardBody>
                                        <CardFooter className="pt-0">
                                            <Button
                                                disabled
                                                tabIndex={-1}
                                                className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                                            >
                                                &nbsp;
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col className="mb-8 " xl={{ span: 7, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 11, offset: 1 }}>
                                    <Card className="mt-6 w-full animate-pulse">
                                        <CardHeader
                                            shadow={false}
                                            floated={false}
                                            className="relative grid h-56 place-items-center bg-gray-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-12 w-12 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </CardHeader>
                                        <CardBody>
                                            <Typography
                                                as="div"
                                                variant="h1"
                                                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                        </CardBody>
                                        <CardFooter className="pt-0">
                                            <Button
                                                disabled
                                                tabIndex={-1}
                                                className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                                            >
                                                &nbsp;
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col className="mb-8 " xl={{ span: 7, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 11, offset: 1 }}>
                                    <Card className="mt-6 w-full animate-pulse">
                                        <CardHeader
                                            shadow={false}
                                            floated={false}
                                            className="relative grid h-56 place-items-center bg-gray-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-12 w-12 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </CardHeader>
                                        <CardBody>
                                            <Typography
                                                as="div"
                                                variant="h1"
                                                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                as="div"
                                                variant="paragraph"
                                                className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                            >
                                                &nbsp;
                                            </Typography>
                                        </CardBody>
                                        <CardFooter className="pt-0">
                                            <Button
                                                disabled
                                                tabIndex={-1}
                                                className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                                            >
                                                &nbsp;
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                            }
                            {!openSkeleton && product.map((product, index) => (
                                <Col key={index} className="mb-8 " xl={{ span: 7, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 11, offset: 1 }}>
                                    <Link to={`/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`} onClick={() => handleScrollUp()}>
                                        <Card className="w-full relative" style={{ border: '3px solid black' }}>
                                            <CardHeader floated={false} className="sm:h-[300px] sm:w-auto sm:p-4 w-[153px] h-[153px] p-1 flex">
                                                <img className="h-full w-full sm:m-auto hover:scale-110" src={`http://localhost:8080/images/${product.img}`} alt="profile-picture" />
                                            </CardHeader>
                                            <CardBody className="p-4 text-start h-[182px]">
                                                <div className="h-[112px]">
                                                    <Typography color="blue-gray" className="text-gray-600 product-name sm:text-[18px] text-[14px]">
                                                        {product.name}
                                                    </Typography>
                                                    <div className="flex items-center">
                                                        {product.discount > 0 ? <div className="sm:flex sm:items-center">
                                                            <Typography color="red" className="font-semibold sm:mb-4 mt-2 sm:mr-3 mr-1 sm:text-[18px] text-[16px]" textGradient>
                                                                {formatNumber(Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)} đ
                                                            </Typography>
                                                            <Typography className="font-normal line-through sm:mb-4 sm:mt-2 text-gray-500 sm:text-[18px] text-[14px]" textGradient>
                                                                {formatNumber(product.price)} đ
                                                            </Typography>
                                                        </div> : <Typography color="red" className="font-semibold sm:mb-4 mt-2 sm:mr-3 mr-1 sm:text-[18px] text-[16px]" textGradient>
                                                            {formatNumber(product.price)} đ
                                                        </Typography>}
                                                    </div>
                                                </div>
                                                <Button color="red" className="w-full text-[8px] sm:text-[12px]" onClick={(e) => {
                                                    e.preventDefault()
                                                    if (!window.localStorage.getItem('User')) {
                                                        window.location.href = 'http://localhost:3000/SignIn';
                                                    } else handleAddCart(product.id, 1, Math.floor((product.price - (product.price * product.discount) / 100) / 1000) * 1000)
                                                }}>Thêm vào giỏ hàng</Button>
                                            </CardBody>
                                            {product.discount > 0 ? <div className="absolute top-4 right-0 sm:w-[70px] sm:h-[30px] w-[50px] h-[14px]text-[14px] bg-red-500 rounded-tl rounded-bl text-white lg:text-base flex justify-center items-center">
                                                -{product.discount}%
                                            </div> : ''}
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Pagination: {
                                        itemActiveBg: '#000',
                                        itemSize: 40
                                    },
                                },
                                token: {
                                    colorPrimary: '#fff'
                                },
                            }}
                        >
                            <Pagination align="center" defaultCurrent={1} current={currentPage} total={totalPage.current} showSizeChanger={false} defaultPageSize={12} onChange={onChangePagination} hideOnSinglePage={true} />
                        </ConfigProvider>
                    </Content>
                </Layout>
                <>
                    {contextHolder}
                    <Space className="hidden">
                        <Button type="primary" onClick={() => openNotification('top')}>
                            top
                        </Button>
                    </Space>
                </>

                <div className="fixed left-0 bottom-30">
                    <button onClick={() => setOpenDrawer(true)} className="lg:hidden fixed left-0 top-32 sm:w-[30px] sm:h-[80px] w-[20px] h-[50px] text-2xl z-[1000] bg-black text-white sm:text-3xl sm:rounded-tr-xl sm:rounded-br-xl rounded-tr-lg rounded-br-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="#ffffff" d="M10 20v-7L2.95 4h18.1L14 13v7zm2-7.7L16.95 6h-9.9zm0 0"></path>
                        </svg>
                    </button>
                    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} className="p-4 overflow-y-auto">
                        <Card className="max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                            <div className="mb-2 p-4">
                                <Typography variant="h5" color="blue-gray">
                                    {language == 1 ? 'Danh Mục' : 'Category'}
                                </Typography>
                            </div>
                            <div className="p-2">
                                <Input
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    label={language == 1 ? 'Tìm kiếm' : 'Search'}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <List>
                                <div className="product">
                                    <Accordion
                                        open={open === 1}
                                        icon={
                                            <ChevronDownIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                            />
                                        }
                                    >
                                        <ListItem className="p-0" selected={open === 1}>
                                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                                <ListItemPrefix>
                                                    <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff0000" d="M3 17.2q0-.4.263-.675t.637-.275q.2 0 .388.063t.362.187q.325.2.65.35T6 17q.825 0 1.413-.587T8 15t-.587-1.412T6 13q-.375 0-.725.125t-.625.375q-.15.125-.35.188t-.4.062q-.375 0-.637-.275T3 12.8V9q0-.425.288-.712T4 8h3.75q-.125-.375-.187-.75T7.5 6.5q0-1.875 1.313-3.187T12 2t3.188 1.313T16.5 6.5q0 .375-.062.75T16.25 8H20q.425 0 .713.288T21 9v3.8q0 .425-.288.713T20 13.8q-.2 0-.35-.088t-.3-.212q-.275-.25-.625-.375T18 13q-.825 0-1.413.588T16 15t.588 1.413T18 17q.375 0 .725-.125t.625-.375q.125-.125.288-.213T20 16.2q.425 0 .713.288T21 17.2V21q0 .425-.288.713T20 22H4q-.425 0-.712-.288T3 21z"></path></svg>
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto font-normal">
                                                    {language == 1 ? 'Đồ Chơi' : 'Toys'}
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                {category.map((category, index) => {
                                                    if (category.group == 1) {
                                                        return (
                                                            <Link to={`http://localhost:3000/Product/${removeVietnameseAccents(category.name)}-${category.id}`}>
                                                                <ListItem>
                                                                    <ListItemPrefix>
                                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                                    </ListItemPrefix>
                                                                    {category.name}
                                                                    <ListItemSuffix>
                                                                        <Chip value={category.quantity} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                                    </ListItemSuffix>
                                                                </ListItem>
                                                            </Link>
                                                        )
                                                    }
                                                })}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion
                                        open={open === 2}
                                        icon={
                                            <ChevronDownIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                            />
                                        }
                                    >
                                        <ListItem className="p-0" selected={open === 2}>
                                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                                <ListItemPrefix>
                                                    <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#eff231" fillRule="evenodd" d="M7.985 4.146a.625.625 0 0 1 .515-.271H11a.625.625 0 1 1 0 1.25H9.41l1.166 3.031a2.876 2.876 0 1 1-2.2 1.669l-.885 1.062a.622.622 0 0 1-.429.235l-1.2.15A2.875 2.875 0 1 1 3.694 8.21l.547-1.094l-.595-.991H3a.625.625 0 1 1 0-1.25h2.5a.625.625 0 1 1 0 1.25h-.396l.38.635l.009.013l1.59 2.65L8.89 7.257l-.973-2.532a.625.625 0 0 1 .068-.578Zm2.432 7.078l-.539-1.4a1.625 1.625 0 1 0 1.167-.448l.538 1.4a.625.625 0 0 1-1.166.448M9.404 8.591l.005.014a2.873 2.873 0 0 0-.038.026zm-4.4-.204l-.44.88l-.483.968l1.074-.134l.815-.102l-.967-1.612Zm-.438 3.047l-1.488.186a.625.625 0 0 1-.637-.9l.67-1.341A1.623 1.623 0 0 0 1.375 11a1.625 1.625 0 0 0 3.19.434Z" clipRule="evenodd"></path></svg>
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto font-normal">
                                                    {language == 1 ? 'Phương Tiện Di Chuyển' : 'Transport'}
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                {category.map((category, index) => {
                                                    if (category.group == 2) {
                                                        return (
                                                            <Link to={`/Product/${removeVietnameseAccents(category.name)}-${category.id}`}>
                                                                <ListItem>
                                                                    <ListItemPrefix>
                                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                                    </ListItemPrefix>
                                                                    {category.name}
                                                                    <ListItemSuffix>
                                                                        <Chip value={category.quantity} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                                    </ListItemSuffix>
                                                                </ListItem>
                                                            </Link>
                                                        )
                                                    }
                                                })}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                </div>
                                <hr className="my-2 border-blue-gray-50" />
                                <div className="mb-2 p-4">
                                    <Typography variant="h5" color="blue-gray">
                                        {language == 1 ? 'Bộ Lọc' : 'Filter'}
                                    </Typography>
                                </div>
                                <div className="filter">
                                    <Accordion
                                        open={openPrice === true}
                                        icon={
                                            <ChevronDownIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${openPrice === true ? "rotate-180" : ""}`}
                                            />
                                        }
                                    >
                                        <ListItem className="p-0" selected={openPrice === true}>
                                            <AccordionHeader onClick={() => handleOpenPrice(true)} className="border-b-0 p-3">
                                                <ListItemPrefix className="text-green-600">
                                                    <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711c-.22.11-.425.218-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a15.515 15.515 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a24.574 24.574 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4.001 4.001 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4.001 4.001 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4" clipRule="evenodd"></path></svg>
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto font-normal">
                                                    {language == 1 ? 'Giá' : 'Price'}
                                                    {/* <span className={`${priceValue <= 2000000 ? "text-green-600" : priceValue <= 5000000 ? "text-orange-500" : priceValue <= 10000000 ? "text-red-600" : "text-black"}`}>
                                                    {`${priceValue.toLocaleString('vi-VN')}đ`}
                                                </span> */}
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                {/* <Slider style={{ margin: '10px' }} defaultValue={0} onChange={handleChangePrice} min={0} max={10000000} step={10000} /> */}
                                                <div className="flex flex-col gap-2">
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                price: [10000, 200000]
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="price"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? 'Dưới 200.000' : '$1 - $10'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                price: [200000, 500000]
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="price"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '200.000 - 500.000' : '$10 - $20'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                price: [500000, 1000000]
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="price"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '500.000 - 1.000.000' : '$20 - $40'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                price: [1000000, 2000000]
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="price"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '1.000.000 - 2.000.000' : '$40 - $80'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                price: [2000000, 5000000]
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="price"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '2.000.000 - 5.000.000' : '$80 - $200'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                price: [5000000, 10000000]
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="price"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '5.000.000 - 10.000.000' : '$200 - $400'}
                                                            </Typography>
                                                        }
                                                    />
                                                </div>
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion
                                        open={openAge === true}
                                        icon={
                                            <ChevronDownIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${openAge === true ? "rotate-180" : ""}`}
                                            />
                                        }
                                    >
                                        <ListItem className="p-0" selected={openAge === true}>
                                            <AccordionHeader onClick={() => handleOpenAge(true)} className="border-b-0 p-3">
                                                <ListItemPrefix className="text-red-600">
                                                    <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z"></path></svg>
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto font-normal">
                                                    {language == 1 ? 'Độ Tuổi' : 'Age'}
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                <div className="flex flex-col gap-2 text-sm">
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                age: 1
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="age"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '1 - 3 tuổi' : 'Under 3 years old'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                age: 2
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="age"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '3 - 6 tuổi' : '3 - 6'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                age: 3
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="age"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? '6 - 12 tuổi' : '6 - 12'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                age: 4
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="age"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? 'Trên 12 tuổi' : 'Over 12 years old'}
                                                            </Typography>
                                                        }
                                                    />
                                                </div>
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion
                                        open={openGender === true}
                                        icon={
                                            <ChevronDownIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${openGender === true ? "rotate-180" : ""}`}
                                            />
                                        }
                                    >
                                        <ListItem className="p-0" selected={openGender === true}>
                                            <AccordionHeader onClick={() => handleOpenGender(true)} className="border-b-0 p-3">
                                                <ListItemPrefix className="text-indigo-600 ">
                                                    <svg className='text-3xl' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#514aba" d="M208 20h-40a12 12 0 0 0 0 24h11l-15.64 15.67A68 68 0 1 0 108 178.92V192H88a12 12 0 0 0 0 24h20v16a12 12 0 0 0 24 0v-16h20a12 12 0 0 0 0-24h-20v-13.08a67.93 67.93 0 0 0 46.9-100.84L196 61v11a12 12 0 0 0 24 0V32a12 12 0 0 0-12-12m-88 136a44 44 0 1 1 44-44a44.05 44.05 0 0 1-44 44"></path></svg>
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto font-normal">
                                                    {language == 1 ? 'Giới Tính' : 'Gender'}
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                <div className="flex flex-col gap-2 text-sm">
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                gender: 1
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="indigo"
                                                        name="gender"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? 'Nam' : 'Male'}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Radio
                                                        onClick={() => {
                                                            filter.current = {
                                                                ...filter.current,
                                                                page: 1,
                                                                gender: 2
                                                            }
                                                            getApiProductByFilter()
                                                        }}
                                                        color="pink"
                                                        name="gender"
                                                        label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                {language == 1 ? 'Nữ' : 'Female'}
                                                            </Typography>
                                                        }
                                                    />
                                                </div>
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                </div>
                            </List>
                        </Card>
                    </Drawer>
                </div>
            </Content >
        </Layout >
    );
};