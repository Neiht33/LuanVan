import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function UserAddress({ language, user }) {


    return (
        <div className="p-4 bg-white">
            <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid #ccc' }}>
                <Typography variant="h4" className="font-normal">
                    {language == 1 ? 'Địa Chỉ Của Tôi' : 'My Address'}
                </Typography>
                <Button color="blue" className="flex items-center justify-between py-3 px-6">
                    <svg className="text-lg mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>
                    Thêm địa chỉ mới
                </Button>
            </div>
            <div className="p-8">
                <Typography variant="h5" className="pb-4 text-start font-normal" >
                    {language == 1 ? 'Địa chỉ' : 'Address'}
                </Typography>
                <div className="" style={{ borderBottom: '1px solid #ccc' }}>
                    <div className="text-start flex mb-2 items-center">
                        <div className="pr-4 text-base" style={{ borderRight: '1px solid #ccc' }}>
                            {user.name}
                        </div>
                        <div className="ml-4 text-gray-600">
                            (+084) {user.phoneNumber.slice(1, user.phoneNumber.length)}
                        </div>
                    </div>
                    <div className="text-gray-600 text-start pb-4">
                        {`${user.city} - ${user.district} - ${user.address}`}
                    </div>
                </div>
            </div>
        </div>
    );
}