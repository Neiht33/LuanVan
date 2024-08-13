import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Col, Row } from "antd";
import { Link, Route, Router, Routes } from "react-router-dom";
import UserProfile from "./userProfile";
import UserAddress from "./userAddress";
import UserOrder from "./userOrder";

export default function Account({ language }) {

    const [open, setOpen] = useState(0);
    const [user, setUser] = useState(0);

    useEffect(() => {
        if (window.localStorage.getItem('User')) {
            setUser(JSON.parse(window.localStorage.getItem('User')))
        }
    }, [])

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Row className="p-8">
            <Col className="flex justify-center" xl={{ span: 7, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-transparent shadow-none">
                    <div className="mb-2 px-4 py-2">
                        <Typography variant="h5" color="blue-gray">
                            {user.name}
                        </Typography>
                    </div>
                    <List>
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
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        {language == 1 ? 'Tài khoản của tôi' : 'My Account'}
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <Link to='/Account/'>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            {language == 1 ? 'Hồ sơ' : 'Profile'}
                                        </ListItem>
                                    </Link>
                                    <Link to='/Account/address'>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            {language == 1 ? 'Địa chỉ' : 'Address'}
                                        </ListItem>
                                    </Link>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Link to={'/Account/order'}>
                            <ListItem>
                                <svg className="mr-4" style={{ fontSize: '20px' }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSBill0"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M10 6a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v38l-7-5l-7 5l-7-5l-7 5z"></path><path stroke="#000" d="M18 22h12m-12 8h12M18 14h12"></path></g></mask></defs><path fill="#455a64" d="M0 0h48v48H0z" mask="url(#ipSBill0)"></path></svg>
                                {language == 1 ? 'Đơn mua' : 'My Purchase'}
                            </ListItem>
                        </Link>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            {language == 1 ? 'Đăng xuất' : 'Log Out'}
                        </ListItem>
                    </List>
                </Card>
            </Col>
            <Col className="bg-white min-h-[200px] w-full rounded" xl={{ span: 17, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Routes>
                    <Route path="/" element={<UserProfile user={user} language={language} />} />
                    <Route path="/address" element={<UserAddress user={user} language={language} />} />
                    <Route path="/order" element={<UserOrder user={user} language={language} />} />
                </Routes>
            </Col>
        </Row>
    );
}