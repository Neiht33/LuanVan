import React, { useEffect, useState } from "react";
import { Input, Typography } from "@material-tailwind/react";

export default function UserProfile({ language, user }) {


    return (
        <div className="p-4">
            <div xl={{ span: 24, offset: 0 }} sm={{ span: 11, offset: 1 }} xs={{ span: 12 }}>
                <Typography variant="h4" className="pb-4 text-start font-normal" style={{ borderBottom: '1px solid #ccc' }}>
                    {language == 1 ? 'Hồ Sơ Của Tôi' : 'My Profile'}
                </Typography>
            </div>
            <div className="p-8">
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
            </div>
        </div>
    );
}