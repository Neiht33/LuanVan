import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Col, Row } from "antd";
import Linechart from "../Linechart/linechart";
import Barchart from "../Barchart/barchart";

export default function Dashboard() {
    return (
        <Row>
            <Col xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Typography variant="h3" className="my-8 text-start">
                    Thống Kê
                </Typography>
            </Col>
            <Col xl={{ span: 5, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Card className="mb-6">
                    <CardBody className="flex justify-between items-start text-start px-4">
                        <div>
                            <Typography variant="h6" className="mb-2 text-gray-500">
                                Tổng khách hàng
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                112
                            </Typography>
                        </div>
                        <div className=" flex justify-center items-center bg-black w-[50px] h-[50px] text-3xl rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.87 415.87 0 0 1 299.264-399.104L512 704zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0"></path></svg>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Card className="mb-6">
                    <CardBody className="flex justify-between items-start text-start px-4">
                        <div>
                            <Typography variant="h6" className="mb-2 text-gray-500">
                                Tổng Sản Phẩm
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                2.948
                            </Typography>
                        </div>
                        <div className=" flex justify-center items-center bg-black w-[50px] h-[50px] text-3xl rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 20V6.916L6.416 4h11.15L20 6.954V20zM5.38 6.808H18.6L17.077 5H6.904zM9 14.596l3-1.5l3 1.5V7.808H9z"></path></svg>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Card className="mb-6">
                    <CardBody className="flex justify-between items-start text-start px-4">
                        <div>
                            <Typography variant="h6" className="mb-2 text-gray-500">
                                Tổng Đơn Hàng
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                849
                            </Typography>
                        </div>
                        <div className=" flex justify-center items-center bg-black w-[50px] h-[50px] text-3xl rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffffff" d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2z"></path></svg>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={{ span: 6, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Card className="mb-6">
                    <CardBody className="flex justify-between items-start text-start px-4">
                        <div>
                            <Typography variant="h6" className="mb-2 text-gray-500">
                                Tổng Doanh Thu
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                35.200.000
                            </Typography>
                        </div>
                        <div className=" flex justify-center items-center bg-black w-[50px] h-[50px] text-3xl rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffffff" fillRule="evenodd" d="M12.052 1.25h-.104c-.899 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.725c-.456.456-.642 1.023-.726 1.65c-.057.427-.074 1.446-.078 2.32c-2.022.067-3.237.303-4.08 1.147C2 8.343 2 10.229 2 14c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14c0-3.771 0-5.657-1.172-6.828c-.843-.844-2.058-1.08-4.08-1.146c-.004-.875-.02-1.894-.078-2.32c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08m3.196 4.752c-.005-.847-.019-1.758-.064-2.097c-.063-.461-.17-.659-.3-.789c-.13-.13-.328-.237-.79-.3c-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788c-.045.34-.06 1.25-.064 2.097C9.143 6 9.56 6 10 6h4c.441 0 .857 0 1.248.002M12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916c-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417c0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916c.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417c0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75" clipRule="evenodd"></path></svg>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={{ span: 11, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Linechart />
            </Col>
            <Col xl={{ span: 12, offset: 1 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Barchart />
            </Col>
        </Row>
    );
}