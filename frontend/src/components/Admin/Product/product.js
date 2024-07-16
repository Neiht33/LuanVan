import { Col, InputNumber, Row, Upload, Image } from "antd";
import { Breadcrumbs, Button, ButtonGroup, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Typography, Select, Textarea, Card, Radio } from "@material-tailwind/react"
import React, { useState } from "react";
import img1 from '../../../img/bearbrick.png'
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Danh Mục", "Nhóm Danh Mục", "Tùy Chỉnh", ""];

const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
    },
    {
        name: "Laurent Perrier",
        job: "Executive",
    }
];

export default function Product() {

    const [openDelete, setOpenDelete] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState('AllProduct')

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
    ]);
    const handlePreview = async (file) => {
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        // setFileList(newFileList)
    };

    const handleChangeList = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };

    const handleOpenDelete = () => setOpenDelete(!openDelete);

    return (
        <Row>
            <Typography variant="h3" className="my-8 text-start">
                Sản phẩm
            </Typography>
            <Col xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <ButtonGroup variant="outlined" fullWidth>
                    <Button onClick={() => setCurrentTab('AddProduct')}>THÊM SẢN PHẨM</Button>
                    <Button onClick={() => setCurrentTab('AddCategory')}>THÊM DANH MỤC</Button>
                    <Button color="black" variant="filled">GIẢM GIÁ</Button>
                </ButtonGroup>
            </Col>
            {(currentTab == 'AllProduct') && <><Row className='order-title w-full mt-4 py-4'>
                <Col className='text-start' xl={{ span: 6, offset: 0 }}>Tên Sản Phẩm</Col>
                <Col className='text-start' xl={{ span: 4, offset: 1 }}>Danh Mục</Col>
                <Col className='text-center' xl={{ span: 2, offset: 0 }}>Giá</Col>
                <Col className='text-center' xl={{ span: 2, offset: 0 }}>Đã Bán</Col>
                <Col className='text-center' xl={{ span: 3, offset: 1 }}>Số Lượng Tồn Kho</Col>
                <Col className='text-start' xl={{ span: 4, offset: 1 }}></Col>
            </Row>
                <Row className='w-full flex items-center py-4'>
                    <Col className='text-start flex justify-start items-center' xl={{ span: 6, offset: 0 }}>
                        <div className='product-info_img h-full w-[50px] mr-2' >
                            <img className='h-[50px] m-auto' src={img1} alt='anh' />
                        </div>
                        Bear Brick
                    </Col>
                    <Col className='text-start' xl={{ span: 4, offset: 1 }}>Mô hình</Col>
                    <Col className='text-center' xl={{ span: 2, offset: 0 }}>350.000</Col>
                    <Col className='text-center' xl={{ span: 2, offset: 0 }}>34</Col>
                    <Col className='text-center' xl={{ span: 3, offset: 1 }}>1275</Col>
                    <Col className='flex justify-end' xl={{ span: 4, offset: 1 }}>
                        <Button color="amber">Chỉnh sửa</Button>
                        <Button className="ml-2" onClick={() => handleOpenDelete()} color="red">
                            <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"></path></svg>
                        </Button>
                        <Dialog open={openDelete} handler={handleOpenDelete}>
                            <DialogHeader>Bạn thật sự muốn xóa sản phẩm này?</DialogHeader>
                            <DialogBody>
                                Sản phẩm sẽ được xóa hoàn toàn khỏi hệ thống khi bạn chọn Xác nhận
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpenDelete}
                                    className="mr-1"
                                >
                                    <span>Hủy</span>
                                </Button>
                                <Button variant="gradient" color="green" onClick={handleOpenDelete}>
                                    <span>Xác nhận</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </Col>
                </Row>
            </>}
            {(currentTab == 'AddProduct') && <div className="w-full">
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
                            <Input label="Tên sản phẩm" />
                        </div>
                        <div className="mb-8 flex justify-between items-center">
                            <div className="h-[40px]">
                                Số lượng:
                                <InputNumber className="h-[40px] pt-[5px] ml-2" min={1} max={10000} defaultValue={1} mouseEnterDelay={0} />
                            </div>
                            <div className="h-[40px]">
                                Giá:
                                <InputNumber className="h-[40px] pt-[5px] ml-2  w-[110px]" min={10000} max={100000000} defaultValue={10000} mouseEnterDelay={0} />
                            </div>
                            <div className="">
                                <Select label="Nhóm Tuổi">
                                    <Option>1 - 3</Option>
                                    <Option>3 - 6</Option>
                                    <Option>6 - 12</Option>
                                    <Option>Trên 12 Tuổi</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="mb-8">
                            <Select label="Danh mục">
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                            </Select>
                        </div>
                        <div>
                            <Textarea label="Mô tả" />
                        </div>
                    </Col>
                    <Col xl={{ span: 11, offset: 1 }}>
                        <div className="flex justify-between items-center pr-16">
                            Nhóm giới tính:
                            <Radio name="gander" label="Nam" />
                            <Radio name="gander" label="Nữ" />
                            <Radio name="gander" label="Cả 2" defaultChecked />
                        </div>
                        <div className="flex items-center my-4">
                            Ảnh chính của sản phẩm:
                            <>
                                <Upload
                                    className="ml-4"
                                    maxCount={1}
                                    action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
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
                                    action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChangeList}
                                >
                                    {/* {fileList.length >= 8 ? null : uploadButton} */}
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
                    </Col>
                </Row>
                <div className="w-full bg-white rounded p-8">
                </div>
            </div>}
            {(currentTab == 'AddCategory') && <div className="w-full">
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
                        <div className="">
                            <div className="mb-8">
                                <Input label="Tên danh mục" />
                            </div>
                            <div className="mb-8">
                                <Select label="Thuộc nhóm danh mục">
                                    <Option>Đồ Chơi</Option>
                                    <Option>Phương Tiện Di Chuyển</Option>
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col xl={{ span: 11, offset: 1 }}>
                        <Card className="h-full w-full overflow-scroll">
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
                                    {TABLE_ROWS.map(({ name, job, date }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                                                        {job}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {date}
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
                                    })}
                                </tbody>
                            </table>
                        </Card>
                    </Col>
                </Row>
            </div>}
        </Row>
    );
}