import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Layout, notification, Pagination, Space, theme } from 'antd';
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
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
import { ChevronRightIcon, ChevronDownIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export function CircularPagination() {
    const [active, setActive] = React.useState(1);

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "black",
        onClick: () => setActive(index),
        className: "rounded-full",
    });

    const formatCurrency = (amount) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

        return formatter.format(amount);
    };

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

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                <IconButton {...getItemProps(1)}>1</IconButton>
                <IconButton {...getItemProps(2)}>2</IconButton>
                <IconButton {...getItemProps(3)}>3</IconButton>
                <IconButton {...getItemProps(4)}>4</IconButton>
                <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function ProductByCategory({ language, getApiCartDetail }) {
    const { id } = useParams();
    const [open, setOpen] = useState(0);
    const [openPrice, setOpenPrice] = useState(true);
    const [openAge, setOpenAge] = useState(true);
    const [openGender, setOpenGender] = useState(true);
    const [drawer, setDrawer] = useState(false);
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    var totalPage = useRef(0)
    var filter = useRef({
        price: [],
        age: '',
        gender: '',
        categoryID: id.match(/[^-]*$/),
        seek: '',
        page: 1
    })
    // const [priceValue, setPriceValue] = useState('');

    const { Content } = Layout;

    useEffect(() => {
        getApiCategory()
        getApiProductByCategoryID(id.match(/[^-]*$/), 1)
    }, [id])

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api[type]({
            message: 'Đã thêm vào giỏ hàng',
            placement: 'top'
        });
    };

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
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductByCategoryID = async (id, page) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/catalog/main?id=${id}&page=${page}`);
            const data = await response.json();
            if (data) {
                setProduct(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiProductByFilter = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/category/filter?${objectToQueryString(filter.current)}`);
            const data = await response.json();
            if (data) {
                console.log(data);
                if (data.length != 0) {
                    totalPage.current = data[0].total
                } else totalPage.current = 0
                setProduct(data);
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

    const handleScrollUp = () => {
        window.scrollTo({
            top: 0
        });
    }

    const onChangePagination = (pageNumber, pageSize) => {
        if (filter.price == null && filter.age == null && filter.gender == null) {
            getApiProductByCategoryID(id.match(/[^-]*$/), pageNumber)
        }
    };

    // const handleChangePrice = (value) => {
    //     setPriceValue(value)
    // };

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
                            {language == 1 ? 'Tất cả sản phẩm' : 'All product'}
                        </Link>
                        <Link to={`/Product/${id}`} className="opacity-60">
                            {category[id[id.length - 1] - 1] ? category[id[id.length - 1] - 1].name : ''}
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
                    <Card className="hidden max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none xl:block" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                        <div className="mb-2 p-4">
                            <Typography variant="h5" color="blue-gray">
                                {language == 1 ? 'Danh Mục' : 'Category'}
                            </Typography>
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
                                                        <a href={`http://localhost:3000/Product/${removeVietnameseAccents(category.name)}-${category.id}`}>
                                                            <ListItem>
                                                                <ListItemPrefix>
                                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                                </ListItemPrefix>
                                                                {category.name}
                                                                <ListItemSuffix>
                                                                    <Chip value={category.quantity} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        </a>
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
                                                        <a href={`/Product/${removeVietnameseAccents(category.name)}-${category.id}`}>
                                                            <ListItem>
                                                                <ListItemPrefix>
                                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                                </ListItemPrefix>
                                                                {category.name}
                                                                <ListItemSuffix>
                                                                    <Chip value={category.quantity} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        </a>
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
                                                            age: 0
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
                        style={{
                            padding: '0 32px 0 0',
                            minHeight: '280px',
                        }}
                    >
                        <Row>
                            {product.map((product, index) => (
                                <Col key={index} className="mb-8" xl={{ span: 7, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                                    <Link to={`/Product/Productdetail/${removeVietnameseAccents(product.name)}-${product.id}`} onClick={() => handleScrollUp()}>
                                        <Card className="w-full" style={{ border: '3px solid black' }}>
                                            <CardHeader floated={false} className="h-[300px] p-4 flex">
                                                <img className="h-full m-auto" src={`http://localhost:8080/images/${product.img}`} alt="profile-picture" />
                                            </CardHeader>
                                            <CardBody className="p-4 text-start h-[182px]">
                                                <div className="h-[112px]">
                                                    <Typography variant="h6" color="blue-gray" className="text-gray-600 product-name">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="h5" color="red" className="font-semibold mb-4 mt-2" textGradient>
                                                        {formatNumber(product.price)} đ
                                                    </Typography>
                                                </div>
                                                <Button color="red" className="w-[240px]" onClick={(e) => {
                                                    e.preventDefault()
                                                    if (!window.localStorage.getItem('User')) {
                                                        window.location.href = 'http://localhost:3000/SignIn';
                                                    } else handleAddCart(product.id, 1, product.price)
                                                }}>Thêm vào giỏ hàng</Button>
                                            </CardBody>
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
                            <Pagination align="center" defaultCurrent={1} total={totalPage.current} showSizeChanger={false} defaultPageSize={12} onChange={onChangePagination} hideOnSinglePage={true} />
                        </ConfigProvider>
                    </Content>
                </Layout>
            </Content>
            <>
                {contextHolder}
                <Space className="hidden">
                    <Button type="primary" onClick={() => openNotification('top')}>
                        top
                    </Button>
                </Space>
            </>
        </Layout>
    );
};