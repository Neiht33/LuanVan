import React, { useEffect, useState } from "react";
import { Input, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";
import { Col, Row } from "antd";

export default function UserOrder({ language, user }) {

    const [activeTab, setActiveTab] = useState("allOrder");
    const [order, setOrder] = useState([]);
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

    useEffect(() => {
        if (user) {
            getApiOrder(user.id)
        }
    }, [user])

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

    return (
        <Row className="p-4">
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
                                onClick={() => setActiveTab(value)}
                                className={`text-lg ${activeTab === value ? "text-blue-500" : ""}`}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    {/* {activeTab == 'allOrder' && order.map((item, index))} */}
                </Tabs>
            </Col>
        </Row>
    );
}