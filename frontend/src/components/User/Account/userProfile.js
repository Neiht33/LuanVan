import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function UserProfile({ language, user }) {

    const [updateProfile, setUpdateProfile] = useState(false)

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
                        <div className="w-3/5 mb-4">
                            <Input label={user.name} disabled />
                        </div>
                    </div>
                    <div className="user-phone">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Số điện thoại' : 'Phone number'}:
                        </Typography>
                        <div className="w-3/5 mb-4">
                            <Input label={user.phoneNumber} disabled />
                        </div>
                    </div>
                    <div className="user-address">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Địa chỉ' : 'Address'}:
                        </Typography>
                        <div className="w-3/5 mb-4">
                            <Input label={`${user.city} - ${user.district} - ${user.address}`} disabled />
                        </div>
                    </div>
                    <Button color="blue" onClick={() => setUpdateProfile((prev) => !prev)}>Cập nhật thông tin</Button>
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
                            <Input label={user.name} />
                        </div>
                    </div>
                    <div className="user-phone">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Số điện thoại' : 'Phone number'}:
                        </Typography>
                        <div className="w-3/5 mb-4">
                            <Input label={user.phoneNumber} />
                        </div>
                    </div>
                    <div className="user-address">
                        <Typography variant="h6" className="pb-2 text-start font-normal">
                            {language == 1 ? 'Địa chỉ' : 'Address'}:
                        </Typography>
                        <div className="w-3/5 mb-4">
                            <Input label={`${user.city} - ${user.district} - ${user.address}`} disabled />
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}