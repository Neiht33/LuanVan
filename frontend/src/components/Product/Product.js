import React from "react";
import './product.css'
import { Layout, theme } from 'antd';
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Slider } from 'antd';
import { Col, Row } from 'antd';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
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

export function CircularPagination() {
    const [active, setActive] = React.useState(1);
   
    const getItemProps = (index) =>
      ({
        variant: active === index ? "filled" : "text",
        color: "white",
        onClick: () => setActive(index),
        className: "rounded-full",
      });
   
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
          className="flex items-center gap-2 rounded-full text-white"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2 text-black">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton>
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full text-white"
          onClick={next}
          disabled={active === 5}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    );
  }

export function Product() {
    const [open, setOpen] = React.useState(0);
    const [openPrice, setOpenPrice] = React.useState(true);
    const [openAge, setOpenAge] = React.useState(true);
    const [openGender, setOpenGender] = React.useState(true);
    const [priceValue, setPriceValue] = React.useState(0);
    const [drawer, setDrawer] = React.useState(false);
 
    const openDrawer = () => setDrawer(true);
    const closeDrawer = () => setDrawer(false);
    const { Content } = Layout;
    
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

    const handleChangePrice = (value) => {
        setPriceValue(value)
    };
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

  return (
    <Layout style={{
        paddingTop: '74px',
        minHeight: '400px',
        backgroundColor: 'transparent'
      }}>
      <Content
      >
        <div className="w-full" style={{backgroundColor: '#dfe0ef', position:'relative'}}>
            <Breadcrumbs style={{backgroundColor: 'transparent'}}>
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
                    <span>Tất Cả Sản Phẩm</span>
                </Link>
                <React.Fragment className="overflow-scroll">
                    <button className="breadcrumb-btn text-2xl xl:hidden sm:block" onClick={openDrawer}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"></path></svg></button>
                    <Drawer className="overflow-scroll" open={drawer} onClose={closeDrawer}>
                        <div className="items-center gap-x-2 xl:hidden sm:flex">
                            <div className="relative flex w-full gap-2 md:w-max">
                                <Input
                                type="search"
                                placeholder="Nhập từ khóa để tìm kiếm sản phẩm"
                                containerProps={{
                                    className: "min-w-[288px]",
                                }}
                                className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                />
                                <div className="!absolute left-3 top-[13px]">
                                <svg
                                    width="13"
                                    height="14"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                    fill="#CFD8DC"
                                    />
                                    <path
                                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                    stroke="#CFD8DC"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                </div>
                            </div>
                        </div>
                        <Card className="shadow-xl shadow-blue-gray-900/5 rounded-none " style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
                                <div className="mb-2 p-4">
                                    <Typography variant="h5" color="blue-gray">
                                        Danh Mục
                                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                    </svg>
                                        </IconButton>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff0000" d="M3 17.2q0-.4.263-.675t.637-.275q.2 0 .388.063t.362.187q.325.2.65.35T6 17q.825 0 1.413-.587T8 15t-.587-1.412T6 13q-.375 0-.725.125t-.625.375q-.15.125-.35.188t-.4.062q-.375 0-.637-.275T3 12.8V9q0-.425.288-.712T4 8h3.75q-.125-.375-.187-.75T7.5 6.5q0-1.875 1.313-3.187T12 2t3.188 1.313T16.5 6.5q0 .375-.062.75T16.25 8H20q.425 0 .713.288T21 9v3.8q0 .425-.288.713T20 13.8q-.2 0-.35-.088t-.3-.212q-.275-.25-.625-.375T18 13q-.825 0-1.413.588T16 15t.588 1.413T18 17q.375 0 .725-.125t.625-.375q.125-.125.288-.213T20 16.2q.425 0 .713.288T21 17.2V21q0 .425-.288.713T20 22H4q-.425 0-.712-.288T3 21z"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                Đồ Chơi
                                            </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Siêu anh hùng
                                                    <ListItemSuffix>
                                                        <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                    </ListItemSuffix>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Đồ chơi lắp ghép
                                                    <ListItemSuffix>
                                                        <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                    </ListItemSuffix>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Đồ chơi sáng tạo
                                                    <ListItemSuffix>
                                                        <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                    </ListItemSuffix>
                                                </ListItem>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#eff231" fillRule="evenodd" d="M7.985 4.146a.625.625 0 0 1 .515-.271H11a.625.625 0 1 1 0 1.25H9.41l1.166 3.031a2.876 2.876 0 1 1-2.2 1.669l-.885 1.062a.622.622 0 0 1-.429.235l-1.2.15A2.875 2.875 0 1 1 3.694 8.21l.547-1.094l-.595-.991H3a.625.625 0 1 1 0-1.25h2.5a.625.625 0 1 1 0 1.25h-.396l.38.635l.009.013l1.59 2.65L8.89 7.257l-.973-2.532a.625.625 0 0 1 .068-.578Zm2.432 7.078l-.539-1.4a1.625 1.625 0 1 0 1.167-.448l.538 1.4a.625.625 0 0 1-1.166.448M9.404 8.591l.005.014a2.873 2.873 0 0 0-.038.026zm-4.4-.204l-.44.88l-.483.968l1.074-.134l.815-.102l-.967-1.612Zm-.438 3.047l-1.488.186a.625.625 0 0 1-.637-.9l.67-1.341A1.623 1.623 0 0 0 1.375 11a1.625 1.625 0 0 0 3.19.434Z" clipRule="evenodd"></path></svg>
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                Phương Tiện Di Chuyển
                                            </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                            <ListItem>
                                                <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Xe Đạp
                                                <ListItemSuffix>
                                                    <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                </ListItemSuffix>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Scooter
                                                <ListItemSuffix>
                                                    <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                </ListItemSuffix>
                                            </ListItem>
                                            </List>
                                        </AccordionBody>
                                        </Accordion>
                                    </div>
                                    <hr className="my-2 border-blue-gray-50" />
                                    <div className="mb-2 p-4">
                                        <Typography variant="h5" color="blue-gray">
                                            Bộ Lọc
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711c-.22.11-.425.218-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a15.515 15.515 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a24.574 24.574 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4.001 4.001 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4.001 4.001 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4" clipRule="evenodd"></path></svg>
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto font-normal">
                                                    Giá <span className={`${priceValue <= 2000000 ? "text-green-600" : priceValue <= 5000000 ? "text-orange-500" : priceValue <= 10000000 ? "text-red-600" : "text-black"}`}>
                                                        {`${priceValue.toLocaleString('vi-VN')}đ`}
                                                    </span>
                                                </Typography>
                                                </AccordionHeader>
                                            </ListItem>
                                            <AccordionBody className="py-1">
                                                <List className="p-0">
                                                    <Slider style={{margin: '10px'}} defaultValue={0} onChange={handleChangePrice} min={0} max={10000000} step={10000} />
                                                    <div className="flex flex-col gap-2">
                                                        <Radio
                                                            color="indigo"
                                                            name="price"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                Dưới 200.000đ
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="price"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                200.000 - 500.000
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="price"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                500.000 - 1.000.000
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="price"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                1.000.000 - 2.000.000
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="price"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                2.000.000 - 5.000.000
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="price"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                5.000.000 - 10.000.000
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z"></path></svg>
                                                    </ListItemPrefix>
                                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                                        Tuổi
                                                    </Typography>
                                                </AccordionHeader>
                                            </ListItem>
                                            <AccordionBody className="py-1">
                                                <List className="p-0">
                                                    <div className="flex flex-col gap-2 text-sm">
                                                        <Radio
                                                            color="indigo"
                                                            name="age"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                1 - 3 Tuổi
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="age"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                3 - 6 Tuổi
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="age"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                6 - 12 Tuổi
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="indigo"
                                                            name="age"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                Trên 12 tuổi
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#514aba" d="M208 20h-40a12 12 0 0 0 0 24h11l-15.64 15.67A68 68 0 1 0 108 178.92V192H88a12 12 0 0 0 0 24h20v16a12 12 0 0 0 24 0v-16h20a12 12 0 0 0 0-24h-20v-13.08a67.93 67.93 0 0 0 46.9-100.84L196 61v11a12 12 0 0 0 24 0V32a12 12 0 0 0-12-12m-88 136a44 44 0 1 1 44-44a44.05 44.05 0 0 1-44 44"></path></svg>
                                                    </ListItemPrefix>
                                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                                        Giới Tính
                                                    </Typography>
                                                </AccordionHeader>
                                            </ListItem>
                                            <AccordionBody className="py-1">
                                                <List className="p-0">
                                                    <div className="flex flex-col gap-2 text-sm">
                                                        <Radio
                                                            color="indigo"
                                                            name="gender"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                Nam
                                                            </Typography>
                                                            }
                                                        />
                                                        <Radio
                                                            color="pink"
                                                            name="gender"
                                                            label={
                                                            <Typography
                                                                className="flex font-medium text-black"
                                                            >
                                                                Nữ
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
                </React.Fragment>
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
            <Card className="hidden max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none xl:block" style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                    Danh Mục
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
                                Đồ Chơi
                            </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Siêu anh hùng
                                    <ListItemSuffix>
                                        <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Đồ chơi lắp ghép
                                    <ListItemSuffix>
                                        <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Đồ chơi sáng tạo
                                    <ListItemSuffix>
                                        <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
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
                                Phương Tiện Di Chuyển
                            </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Xe Đạp
                                <ListItemSuffix>
                                    <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Scooter
                                <ListItemSuffix>
                                    <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            </List>
                        </AccordionBody>
                        </Accordion>
                    </div>
                    <hr className="my-2 border-blue-gray-50" />
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray">
                            Bộ Lọc
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
                                    Giá <span className={`${priceValue <= 2000000 ? "text-green-600" : priceValue <= 5000000 ? "text-orange-500" : priceValue <= 10000000 ? "text-red-600" : "text-black"}`}>
                                        {`${priceValue.toLocaleString('vi-VN')}đ`}
                                    </span>
                                </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <Slider style={{margin: '10px'}} defaultValue={0} onChange={handleChangePrice} min={0} max={10000000} step={10000} />
                                    <div className="flex flex-col gap-2">
                                        <Radio
                                            color="indigo"
                                            name="price"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                Dưới 200.000đ
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="price"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                200.000 - 500.000
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="price"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                500.000 - 1.000.000
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="price"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                1.000.000 - 2.000.000
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="price"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                2.000.000 - 5.000.000
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="price"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                5.000.000 - 10.000.000
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
                                        Tuổi
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <div className="flex flex-col gap-2 text-sm">
                                        <Radio
                                            color="indigo"
                                            name="age"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                1 - 3 Tuổi
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="age"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                3 - 6 Tuổi
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="age"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                6 - 12 Tuổi
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="indigo"
                                            name="age"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                Trên 12 tuổi
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
                                        Giới Tính
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <div className="flex flex-col gap-2 text-sm">
                                        <Radio
                                            color="indigo"
                                            name="gender"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                Nam
                                            </Typography>
                                            }
                                        />
                                        <Radio
                                            color="pink"
                                            name="gender"
                                            label={
                                            <Typography
                                                className="flex font-medium text-black"
                                            >
                                                Nữ
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
                padding: '0 24px 0 0',
                minHeight: '280px',
                }}
            >
                <Row>
                    <Col className="mb-4" xl={{ span: 7, offset: 1  }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{maxHeight: '248px'}}>
                                <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture"/>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                Natalie Paisley
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                CEO / Co-Founder
                                </Typography>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mb-4" xl={{ span: 7, offset: 1  }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{maxHeight: '248px'}}>
                                <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                Natalie Paisley
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                CEO / Co-Founder
                                </Typography>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mb-4" xl={{ span: 7, offset: 1  }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{maxHeight: '248px'}}>
                                <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                Natalie Paisley
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                CEO / Co-Founder
                                </Typography>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mb-4" xl={{ span: 7, offset: 1  }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{maxHeight: '248px'}}>
                                <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                Natalie Paisley
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                CEO / Co-Founder
                                </Typography>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <div className="flex justify-center w-full mt-5">
                    <CircularPagination className=""/>
                </div>
            </Content>
        </Layout>
      </Content>
    </Layout>
  );
};