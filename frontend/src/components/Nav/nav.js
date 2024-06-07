import React from "react";
import style from './nav.css'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Badge
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Nav() {
    const [openNav, setOpenNav] = React.useState(false);
    let lastScrollTop = React.useRef(0);

    const handleScroll = () => {
      const navMain = document.querySelector('.nav-main')
      if((window.scrollY > lastScrollTop) && (window.scrollY > 1)) {
        navMain.classList.remove('navMoveDown')
        navMain.classList.add('navMoveUp')
        navMain.classList.add('fixed')
      }else 
      if((window.scrollY < lastScrollTop) && (window.scrollY > 1)) {
        navMain.classList.remove('navMoveUp')
        navMain.classList.add('navMoveDown')
      }else 
      if(window.scrollY <= 1){
        navMain.classList.remove('fixed')
      }

      lastScrollTop = window.scrollY >= 0? window.scrollY : lastScrollTop
    }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );

    window.addEventListener('scroll', handleScroll);

  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <button className="nav-btn">
          <svg className="text-xl mr-1 lg:text-xl sm:text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 15q-1.25 0-2.125-.875T1 12t.875-2.125T4 9V5h5q0-1.25.875-2.125T12 2t2.125.875T15 5h5v4q1.25 0 2.125.875T23 12t-.875 2.125T20 15v6H4zm5-2q.625 0 1.063-.437T10.5 11.5t-.437-1.062T9 10t-1.062.438T7.5 11.5t.438 1.063T9 13m6 0q.625 0 1.063-.437T16.5 11.5t-.437-1.062T15 10t-1.062.438T13.5 11.5t.438 1.063T15 13m-7 4h8v-2H8z"></path></svg>
          <Link to={'/Product'} className="flex items-center">
            <span className='hidden lg:block'>Đồ chơi</span>
          </Link>
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <button className="nav-btn">
        <svg className="text-xl mr-1 lg:text-xl sm:text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 12h8v2H8zm2 8H6V4h7v5h5v3.1l2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4zm-2-2h4.1l.9-.9V16H8zm12.2-5c.1 0 .3.1.4.2l1.3 1.3c.2.2.2.6 0 .8l-1 1l-2.1-2.1l1-1c.1-.1.2-.2.4-.2m0 3.9L14.1 23H12v-2.1l6.1-6.1z"></path></svg>
          <Link to={'/Product'} className="flex items-center">
            <span className='hidden lg:block'>Trắc nghiệm MBTI</span>
          </Link>
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <button className="nav-btn">
        <svg className="text-xl mr-1 lg:text-xl sm:text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13q1.45 0 2.475-1.025T15.5 9.5t-1.025-2.475T12 6T9.525 7.025T8.5 9.5t1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-1.15q-1.35-1.325-3.137-2.087T12 15t-3.863.763T5 17.85z"></path></svg>
          <a href="#" className="flex items-center">
            <span className='hidden lg:block'>Đăng nhập</span>
          </a>
        </button>
      </Typography>
      <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium text-black"
        >
          <button className="nav-btn">
            <Badge content="0">
              <svg className="mr-1 sm:text-xs lg:text-xs" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/>
              </svg>
              <a href="#" className="flex items-center">
                <span className='hidden lg:block'>Giỏ hàng</span>
              </a>
            </Badge>
          </button>
      </Typography>
    </ul>
  );
  return (
    <>
      <Navbar className="nav-main mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 max-w-full rounded-none " style={{zIndex: '100', position: 'fixed', minHeight: '74px'}}>
        <div className="container mx-auto flex flex-wrap items-center sm:justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium text-white"
          >
            Sky World
          </Typography>
          <div className="hidden items-center gap-x-2 xl:flex">
              <div className="relative flex w-full gap-2 md:w-max">
                <Input
                  type="search"
                  placeholder="Nhập từ khóa để tìm kiếm sản phẩm"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                  className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="!absolute left-3 top-[13px]">
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                      fill="#CFD8DC"
                    />
                    <path
                      d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                      stroke="#CFD8DC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <Button size="md" className="rounded-lg bg-indigo-600" >
                Tìm kiếm
              </Button>
          </div>
          <div className="sm:block">{navList}</div>
        </div>
      </Navbar>
    </>
  );
}

export default Nav;
