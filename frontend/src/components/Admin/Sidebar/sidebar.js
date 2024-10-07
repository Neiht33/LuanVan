import React from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <Card className="h-[calc(100vh-2rem)] w-full px-4 shadow-transparent">
            <Typography
                as="a"
                href="/"
                className="brand-name cursor-pointer p-[28px] font-medium text-2xl"
            >
                SkyWorld
            </Typography>
            <List className="p-0 min-w-min">
                <Link to={'/Admin'}>
                    <ListItem className="text-xl my-2">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        Thống kê
                    </ListItem>
                </Link>
                <Link to={'/Admin/Order'}>
                    <ListItem className="text-xl my-2">
                        <ListItemPrefix>
                            <ShoppingBagIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        Đơn hàng
                    </ListItem>
                </Link>
                <Link to={'/Admin/Product'}>
                    <ListItem className="text-xl my-2">
                        <ListItemPrefix>
                            <InboxIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        Sản phẩm
                    </ListItem>
                </Link>
                <Link to={'/Admin/Customer'}>
                    <ListItem className="text-xl my-2">
                        <ListItemPrefix>
                            <UserCircleIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        Khách hàng
                    </ListItem>
                </Link>
                <ListItem className="text-xl my-2">
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <Link>
                    <ListItem className="text-xl my-2">
                        <ListItemPrefix>
                            <PowerIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </Link>
            </List>
        </Card>
    );
}
