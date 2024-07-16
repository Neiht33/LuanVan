import React, { useEffect } from 'react';
import './productDetail.css'
import {
    Typography, Button, Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardHeader,
    CardBody,
} from '@material-tailwind/react';
import { Flex, InputNumber, ConfigProvider, Col, Row } from 'antd';


export default function ProductDetail({ language }) {
    const [activeTab, setActiveTab] = React.useState("mota");
    const data = [
        {
            imgelink:
                "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
    ];

    const [active, setActive] = React.useState(
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    );

    useEffect(() => {
        const productAdd = document.querySelector('.translate-add')
        const productBuy = document.querySelector('.translate-buy')
        const productDescription = document.querySelector('.translate-description')
        const productRating = document.querySelector('.translate-rating')
        const productRelated = document.querySelector('.translate-related')

        if (language == 1) {
            productAdd.textContent = 'THÊM VÀO GIỎ HÀNG'
            productBuy.textContent = 'MUA NGAY'
            productDescription.textContent = 'Mô tả'
            productRating.textContent = 'Đánh giá'
            productRelated.textContent = 'Sản phẩm liên quan'
        } else {
            productAdd.textContent = 'ADD TO CART'
            productBuy.textContent = 'BUY NOW'
            productDescription.textContent = 'Product Description'
            productRating.textContent = 'Product Rating'
            productRelated.textContent = 'Related products'
        }
    }, [language])

    return (
        <>
            <div className="ProductDetail">
                <div className='img-container relative p-8'>
                    <div className="grid gap-4">
                        <div>
                            <img
                                className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                                src={active}
                                alt=""
                            />
                        </div>
                        <div className="flex justify-center gap-4">
                            {data.map(({ imgelink }, index) => (
                                <div key={index}>
                                    <img
                                        onClick={() => setActive(imgelink)}
                                        src={imgelink}
                                        className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                        alt="gallery-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='img-container_absolute absolute'></div>
                </div>
                <div className='infomation-container rounded-tl-[200px]'>
                    <Typography className='mb-6' variant="h2">Bear Brick</Typography>
                    <div className='product-rate mb-6 flex items-center'>
                        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffeb0f" d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763z"></path></svg>
                        <span className='product-rate__score font-bold'>4/5</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#d1d1d1" d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"></path></svg>
                        <span className='product-rate__view text-gray-500'>15 Review</span>
                    </div>
                    <div className='product-ingo mb-6 text-gray-600'>Gấu bearbrick hay Be@rbrick là một mô hình gấu bụng phệ. Đây là sản phẩm đồ chơi do công ty MediCom Toy của Nhật Bản sở hữu và sản xuất. Sản phẩm này được sản xuất nhằm vinh danh đạo diễn nổi tiếng Stanley Kubrick nhưng sau đó vì sức hút khó cưỡng mà bearbrick đã được lan rộng ra toàn thế giới.</div>
                    <div className='product-price mb-6 font-bold text-2xl'>329.000đ</div>
                    <div className='mb-6'>
                        <ConfigProvider
                            theme={{
                                components: {
                                    InputNumber: {
                                        activeBorderColor: '#000',
                                        hoverBorderColor: '#000',
                                        handleHoverColor: '#000'
                                    },
                                },
                            }}
                        >
                            <Flex vertical gap={12}>
                                <InputNumber min={1} max={100} defaultValue={1} mouseEnterDelay={0} />
                            </Flex>
                        </ConfigProvider>
                    </div>
                    <div className="flex w-max gap-4">
                        <Button className='translate-add' variant="outlined">THÊM VÀO GIỎ HÀNG</Button>
                        <Button className='translate-buy' variant="filled">MUA NGAY</Button>
                    </div>
                </div>
            </div>
            <div className='ProductSupport bg-white pb-10 min-h-80 mb-6'>
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        <Tab
                            key='mota'
                            value='mota'
                            onClick={() => setActiveTab('mota')}
                            className={`py-4 ${activeTab === 'mota' ? "text-gray-900" : ""}`}
                        >
                            <span className='translate-description'>Mô tả</span>
                        </Tab>
                        <Tab
                            key='danhgia'
                            value='danhgia'
                            onClick={() => setActiveTab('danhgia')}
                            className={`py-4 ${activeTab === 'danhgia' ? "text-gray-900" : ""}`}
                        >
                            <span className='translate-rating'>Đánh giá</span>
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel key='mota' value='mota'>
                            Tượng gấu Bearbrick bao gồm hai nửa được ghép bằng một thanh gỗ lớn. Bức tượng được thiết kế để trông giống như một con gấu đang nằm úp đầu vào chân và hai chân trước duỗi ra trước mặt như thể nó đang ngủ.
                        </TabPanel>
                        <TabPanel key='danhgia' value='danhgia'>
                            danhgia
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
            <div className='product-related bg-white bg-opacity-0'>
                <Typography className='translate-related mb-6 relate-title' variant="h2">Related Product</Typography>
                <Row className='pr-[58px]'>
                    <Col className="" xl={{ span: 5, offset: 1 }} sm={{ span: 7, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{ maxHeight: '248px' }}>
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
                    <Col className="" xl={{ span: 5, offset: 1 }} sm={{ span: 7, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{ maxHeight: '248px' }}>
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
                    <Col className="" xl={{ span: 5, offset: 1 }} sm={{ span: 7, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{ maxHeight: '248px' }}>
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
                    <Col className="" xl={{ span: 5, offset: 1 }} sm={{ span: 7, offset: 1 }} xs={{ span: 12 }}>
                        <Card className="w-full">
                            <CardHeader floated={false} style={{ maxHeight: '248px' }}>
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
            </div>
        </>
    );
}
