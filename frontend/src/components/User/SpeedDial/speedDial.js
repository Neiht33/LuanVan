import './speedDial.css'
import { Link } from 'react-router-dom';
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react";
import {
    PlusIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from 'react';


export default function SpeedDialWithTextInside({ openSpeedDial, language }) {

    const arrayVN = ['Trang chủ', 'Lên']
    const arrayEng = ['Home', 'Up']
    const [currentLG, setCurrentLG] = useState(arrayVN)

    useEffect(() => {
        if (language == 1) {
            setCurrentLG(arrayVN)
        } else {
            setCurrentLG(arrayEng)
        }

    }, [language])

    const handleScrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className={`speedDial bottom-5 right-5 ${openSpeedDial ? 'block' : 'rotate-out-center'}`}>
            <SpeedDial>
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full">
                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <Link to='/' onClick={() => {
                        window.scrollTo({
                            top: 0
                        });
                    }}>
                        <SpeedDialAction className="h-16 w-16">
                            <HomeIcon className="h-5 w-5" />
                            <Typography color="blue-gray" className=" text-xs font-normal">
                                {currentLG[0]}
                            </Typography>
                        </SpeedDialAction>
                    </Link>
                    <SpeedDialAction onClick={() => handleScrollUp()} className="h-16 w-16">
                        <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M12 13q-.425 0-.712-.288T11 12V5.825L7.1 9.7q-.275.275-.687.288T5.7 9.7q-.275-.275-.275-.7t.275-.7l5.6-5.6q.15-.15.325-.212T12 2.425t.375.063t.325.212l5.6 5.6q.275.275.275.688T18.3 9.7q-.3.3-.712.3t-.713-.3L13 5.825V12q0 .425-.288.713T12 13m0 5q-.425 0-.712-.288T11 17v-1q0-.425.288-.712T12 15t.713.288T13 16v1q0 .425-.288.713T12 18m0 4q-.425 0-.712-.288T11 21t.288-.712T12 20t.713.288T13 21t-.288.713T12 22"></path></svg>
                        <Typography color="blue-gray" className="text-xs font-normal">
                            {currentLG[1]}
                        </Typography>
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
}