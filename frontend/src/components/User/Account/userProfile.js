import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import { notification, Space } from "antd";
import axios from "axios";

export default function UserProfile({ language, user, openNotificationSuccess, openNotificationErrorPhone }) {

    const [updateProfile, setUpdateProfile] = useState(false)
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [userAddress, setUserAddress] = useState('');
    const [userName, setUserName] = useState(JSON.parse(window.localStorage.getItem('User')).name);
    const [userPhone, setUserPhone] = useState(JSON.parse(window.localStorage.getItem('User')).phoneNumber);

    let formUpdate = useRef({
        customerID: JSON.parse(window.localStorage.getItem('User')).customerID,
        phoneNumber: JSON.parse(window.localStorage.getItem('User')).phoneNumber,
        name: userName,
        newPhoneNumber: userPhone,
        districtID: '',
        address: userAddress
    })

    useEffect(() => {
        getApiCity()
    }, [])

    const getApiAccountProfile = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/account/accountID/${id}`);
            const data = await response.json();
            if (data) {
                setSelectedCity(data[0].city)
                setSelectedDistrict(data[0].district)
                setUserAddress(data[0].address)
                formUpdate.current['address'] = data[0].address
                formUpdate.current['districtID'] = data[0].districtID
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiCity = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/account/address`);
            const data = await response.json();
            if (data) {
                setCity(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const getApiDistrict = async (id) => {
        try {
            setSelectedDistrict('')
            const response = await fetch(`http://localhost:8080/api/account/address/district/${id}`);
            const data = await response.json();
            if (data) {
                setDistrict(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    }

    const handleUpdateProfile = () => {

        axios.put(`http://localhost:8080/api/account/update`, formUpdate.current, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);

                if (response.data.checkPhone != false) {
                    let data = JSON.parse(window.localStorage.getItem('User'))
                    data = {
                        ...data,
                        name: userName,
                        phoneNumber: userPhone,
                        city: selectedCity,
                        districtID: formUpdate.current.districtID,
                        district: selectedDistrict,
                        address: userAddress
                    }
                    window.localStorage.setItem("User", JSON.stringify(data))
                    window.location.href = 'http://localhost:3000/Account/'
                    openNotificationSuccess('success')
                } else openNotificationErrorPhone('error')
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });

    }

    return (
        <>
            {!updateProfile && <div className="p-4 bg-white">
                <div xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                    <Typography variant="h4" className="pb-4 text-start font-normal" style={{ borderBottom: '1px solid #ccc' }}>
                        {language == 1 ? 'Hồ Sơ Của Tôi' : 'My Profile'}
                    </Typography>
                </div>
                <div className="p-6">
                    <div className="user-name">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Họ và tên' : 'Full name'}:
                        </Typography>
                        <div className="w-4/5 mb-4">
                            <Input className="text-sm md:text-base" label={user.name} disabled />
                        </div>
                    </div>
                    <div className="user-phone">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Số điện thoại' : 'Phone number'}:
                        </Typography>
                        <div className="w-4/5 mb-4">
                            <Input className="text-sm md:text-base" label={user.phoneNumber} disabled />
                        </div>
                    </div>
                    <div className="user-address">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Địa chỉ' : 'Address'}:
                        </Typography>
                        <div className="w-4/5 mb-4">
                            <Input className="text-sm md:text-base" label={`${user.city} - ${user.district} - ${user.address}`} disabled />
                        </div>
                    </div>
                    <Button color="blue" onClick={() => {
                        getApiAccountProfile(user.id)
                        setUpdateProfile((prev) => !prev)
                    }}>Cập nhật thông tin</Button>
                </div>
            </div>}
            {updateProfile && <div className="p-4 bg-white">
                <div xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                    <Typography variant="h4" className="pb-4 text-start font-normal" style={{ borderBottom: '1px solid #ccc' }}>
                        {language == 1 ? 'Hồ Sơ Của Tôi' : 'My Profile'}
                    </Typography>
                </div>
                <div className="p-6">
                    <div className="user-name">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Họ và tên' : 'Full name'}:
                        </Typography>
                        <div className="w-3/5 mb-4">
                            <Input value={userName} label="Họ và tên" onChange={(e) => {
                                setUserName(e.target.value)
                                formUpdate.current['name'] = e.target.value
                            }} />
                        </div>
                    </div>
                    <div className="user-phone">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Số điện thoại' : 'Phone number'}:
                        </Typography>
                        <div className="w-3/5 mb-4">
                            <Input value={userPhone} label="Số điện thoại" onChange={(e) => {
                                setUserPhone(e.target.value)
                                formUpdate.current['newPhoneNumber'] = e.target.value
                            }} />
                        </div>
                    </div>
                    <div className="user-address max-w-[568px] flex flex-wrap">
                        <div className="my-2 w-[284px]">
                            <Select className='' variant="static" selected={() => selectedCity} onChange={setSelectedCity} label={language == 1 ? 'Tỉnh / Thành phố' : 'Province / City'}>
                                {city.map((item, index) =>
                                    <Option className="pt-0" value={item.city} key={index} onClick={() => {
                                        getApiDistrict(item.id)
                                    }}>{item.city}</Option>
                                )}
                            </Select>
                        </div>
                        <div className="my-2 w-[284px]">
                            <Select onChange={setSelectedDistrict} selected={() => selectedDistrict} className='district-selected' variant="static" label={language == 1 ? 'Quận / Huyện' : 'District'}>
                                {district.map((item, index) =>
                                    <Option value={item.district} key={index} onClick={() => formUpdate.current['districtID'] = item.id}>{item.district}</Option>
                                )}
                            </Select>
                        </div>
                    </div>
                    <div className="my-2 max-w-[568px]">
                        <Input className='signUp_address' variant="standard" value={userAddress} onChange={(e) => {
                            setUserAddress(e.target.value)
                            formUpdate.current['address'] = e.target.value
                        }} label={language == 1 ? 'Địa chỉ (Xã, Thị trấn, Đường, Số nhà)' : 'Address (Town, street, house number)'} size="lg" />
                    </div>
                    <Button color="blue" className="w-[174px] mt-4" onClick={() => handleUpdateProfile()}>Lưu</Button>
                </div>
            </div>}
        </>
    );
}