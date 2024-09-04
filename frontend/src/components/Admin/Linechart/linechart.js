import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";



const data = [
    {
        label: "Tuần",
        value: "Week",
    },
    {
        label: "Tháng",
        value: "Month",
    },
    {
        label: "Năm",
        value: "Year",
    }
];

export default function Linechart({ getDaysInCurrentMonth }) {
    const [activeTab, setActiveTab] = useState("Year");

    const [statisticsYear, setStatisticsYear] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [statisticsMonth, setStatisticsMonth] = useState(getDaysInCurrentMonth().map((item, index) => item = 0))
    const [statisticsDayOfWeek, setStatisticsDayOfWeek] = useState([0, 0, 0, 0, 0, 0, 0])

    useEffect(() => {
        getApiStatisticByMonth()
        getApiStatisticByDayOfWeek()
        getApiStatisticByDayInMonth()
    }, [])

    const getApiStatisticByMonth = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/order/statisticsOrderByMonth')
            const data = await response.json();
            if (data) {
                const arrContainer = statisticsYear
                data.forEach((item, index) => {
                    arrContainer[item.month - 1] = item.quantity
                });
                setStatisticsYear(arrContainer)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiStatisticByDayInMonth = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/order/statisticsOrderByDayInMonth')
            const data = await response.json();
            if (data) {
                const arrContainer = statisticsMonth
                data.forEach((item, index) => {
                    arrContainer[item.day - 1] = item.quantity
                });
                setStatisticsMonth(arrContainer)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiStatisticByDayOfWeek = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/order/statisticsOrderByDayOfWeek')
            const data = await response.json();
            if (data) {
                const arrContainer = statisticsDayOfWeek
                data.forEach((item, index) => {
                    if (item.day != 1) {
                        arrContainer[item.day - 2] = item.quantity
                    } else arrContainer[6] = item.quantity
                });
                setStatisticsDayOfWeek(arrContainer)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const chartConfigYear = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Sales",
                data: statisticsYear,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },

            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    const chartConfigMonth = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Sales",
                data: statisticsMonth,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },

            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: getDaysInCurrentMonth(),
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    const chartConfigWeek = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Sales",
                data: statisticsDayOfWeek,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },

            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Hai",
                    "Ba",
                    "Tư",
                    "Năm",
                    "Sáu",
                    "Bảy",
                    "Chủ nhật"
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    return (
        <Card>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div className="flex justify-between items-center w-full">
                    <Typography variant="h6" color="blue-gray">
                        Đơn Hàng
                    </Typography>
                    <Tabs value="Year">
                        <TabsHeader
                            indicatorProps={{
                                className:
                                    "bg-black",
                            }}>
                            {data.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setActiveTab(value)} className={activeTab == value ? 'text-white' : ''}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </div>
            </CardHeader>
            {(activeTab == 'Year' ? true : false) &&
                <CardBody className={`px-2 pb-0`}>
                    <Chart {...chartConfigYear} />
                </CardBody>
            }
            {(activeTab == 'Month' ? true : false) &&
                <CardBody className={`px-2 pb-0`}>
                    <Chart {...chartConfigMonth} />
                </CardBody>
            }
            {(activeTab == 'Week' ? true : false) &&
                <CardBody className={`px-2 pb-0`}>
                    <Chart {...chartConfigWeek} />
                </CardBody>
            }
        </Card >
    );
}