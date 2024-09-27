import React, { useEffect, useLayoutEffect, useState } from "react";
import './nav.css'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Nav({ language, setLanguage, cartDetail }) {
  const [openNav, setOpenNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openMenuAccount, setOpenMenuAccount] = useState(false);
  const [userCurrent, setUserCurrent] = useState(false)
  const [user, setUser] = useState({})

  useLayoutEffect(() => {
    if (window.localStorage.getItem('User')) {
      setUser(JSON.parse(window.localStorage.getItem('User')))
      setUserCurrent(true)
    }
  }, [])


  function removeVietnameseAccents(str) {
    if (str) {
      let withoutAccents = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      // Thay thế khoảng trắng bằng dấu gạch ngang
      return withoutAccents.replace(/\s+/g, '-');
    }
  }

  function formatNumber(number) {
    // Chuyển số thành chuỗi và đảo ngược chuỗi
    let reversedNumberString = String(number).split('').reverse().join('');
    let formattedNumber = '';

    // Thêm dấu chấm ngăn cách vào mỗi 3 ký tự
    for (let i = 0; i < reversedNumberString.length; i++) {
      if (i !== 0 && i % 3 === 0) {
        formattedNumber += '.';
      }
      formattedNumber += reversedNumberString[i];
    }

    // Đảo ngược lại chuỗi đã được định dạng
    return formattedNumber.split('').reverse().join('');
  }

  const navList1 = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 pl-10">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <button className="nav-btn">
          <Link to={'/Product'} className="flex items-center text-base">
            <span className='product-nav block'>
              {language == 1 ? 'Đồ chơi' : 'Toys'}
            </span>
          </Link>
        </button>
      </Typography>
      {!userCurrent && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <button className="nav-btn">
          <Link to={'/SignIn'} className="flex items-center text-base">
            <span className='login-nav lg:block'>
              {language == 1 ? 'Đăng nhập' : 'Sign In'}
            </span>
          </Link>
        </button>
      </Typography>}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <Menu open={openMenu} handler={setOpenMenu} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 hover:bg-transparent outline-none"
            >
              <svg className="text-lg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#050505" strokeWidth="1.5"><path d="M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12z"></path><path d="M16 12c0 1.313-.104 2.614-.305 3.827c-.2 1.213-.495 2.315-.867 3.244c-.371.929-.812 1.665-1.297 2.168c-.486.502-1.006.761-1.531.761c-.525 0-1.045-.259-1.53-.761c-.486-.503-.927-1.24-1.298-2.168c-.372-.929-.667-2.03-.868-3.244A23.614 23.614 0 0 1 8 12c0-1.313.103-2.614.304-3.827s.496-2.315.868-3.244c.371-.929.812-1.665 1.297-2.168C10.955 2.26 11.475 2 12 2c.525 0 1.045.259 1.53.761c.486.503.927 1.24 1.298 2.168c.372.929.667 2.03.867 3.244C15.897 9.386 16 10.687 16 12z"></path><path strokeLinecap="round" d="M2 12h20"></path></g></svg>
              <span className="language">{language == 1 ? 'Tiếng Việt' : 'English'}</span>
              {/* {language == 1 && <svg className="inline md:hidden text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64"><path fill="#ec1c24" d="M64 44c0 6.075-3.373 11-10 11H10C3.373 55 0 50.075 0 44V22c0-6.075 3.373-11 10-11h44c6.627 0 10 4.925 10 11z"></path><path fill="#f9cb38" d="m45.43 28.963l-9.997.015l-3.103-10.114l-3.08 10.114l-10.01-.015l8.106 6.157l-3.14 10.05l8.13-6.241l8.147 6.241l-3.147-10.05z"></path></svg>}
              {language == 2 && <svg className="inline md:hidden text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path><path fill="#CF1B2B" d="m25.14 23l9.712 6.801a4 4 0 0 0 .99-1.749L28.627 23zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943zm10-10h2.141l9.711-6.8a4 4 0 0 0-1.937-1.085L23 12.057zm-12.141 0L1.148 6.2a4 4 0 0 0-.991 1.749L7.372 13z"></path><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a4 4 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21zM36 9a3.98 3.98 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4 4 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059zM13 5v5.837L4.664 5H4a4 4 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A4 4 0 0 0 0 9v.059L5.628 13H0v2h15V5z"></path><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path></svg>} */}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""
                  }`}
              />
            </Button>
          </MenuHandler>
          {!openNav && <MenuList className="">
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.setItem('language', '1')
              setLanguage(1)
            }}>Tiếng Việt</MenuItem>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.setItem('language', '2')
              setLanguage(2)
            }}>English</MenuItem>
          </MenuList>}
        </Menu>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <Menu open={openCart} handler={setOpenCart} placement="bottom-end" allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 w-[50px] hover:bg-transparent outline-none py-0"
            >
              <div className="h-full w-full py-3" onClick={(e) => {
                e.preventDefault()
                if (!window.localStorage.getItem('User')) {
                  window.location.href = 'http://localhost:3000/SignIn';
                } else window.location.href = 'http://localhost:3000/Cart';
              }}>
                <Badge content={cartDetail ? cartDetail.length : '0'}>
                  <svg className="w-full h-full mr-1 text-xs md:text-base" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z" />
                  </svg>
                </Badge>
              </div>
            </Button>
          </MenuHandler>
          {!openNav && <MenuList className="max-h-[374px] overflow-y-scroll">
            <Typography className='font-normal cursor-default text-gray-400 outline-none' variant="h6">Sản phẩm vừa thêm</Typography>
            {cartDetail.length != 0 ? cartDetail.map((item, index) => (
              <MenuItem key={index} className="text-black" style={{ borderBottom: '1px solid #ccc' }} onClick={(e) => {
                e.preventDefault()
                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(item.name)}-${item.id}`
              }}>
                <div className="flex items-center justify-between w-[450px]">
                  <div className="flex items-center w-9/12">
                    <div className="w-[70px] h-[70px] mr-2">
                      <img className="w-full h-full" src={`http://localhost:8080/images/${item.img}`} />
                    </div>
                    <span className="w-9/12 cart-itemName">{item.name}</span>
                  </div>
                  <div className="cart-info text-end">
                    <div className="flex text-red-500">{formatNumber(Math.floor((item.price - (item.price * item.discount) / 100) / 1000) * 1000)} đ</div>
                    <div>SL: {item.quantityCurrent}</div>
                  </div>
                </div>
              </MenuItem>
            )) : ''}
          </MenuList>}
        </Menu>
      </Typography>
      {userCurrent && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <Menu open={openMenuAccount} handler={setOpenMenuAccount} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 hover:bg-transparent"
            >
              <span className="language">{user.name}</span>
            </Button>
          </MenuHandler>
          {!openNav && <MenuList>
            <Link to='/Account' className="hover:border-none outline-none">
              <MenuItem className="text-black outline-none">
                {language == 1 ? 'Tài khoản của tôi' : 'My account'}
              </MenuItem>
            </Link>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.removeItem('User')
              window.location.href = 'http://localhost:3000/'
            }}>
              {language == 1 ? 'Đăng xuất' : 'Log out'}
            </MenuItem>
          </MenuList>}
        </Menu>
      </Typography>}
      {user.level == 2 && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center text-base gap-x-2 py-1 pr-1 pl-4 font-medium text-black border-l-2 border-l-gray-400 hover:cursor-pointer"
        onClick={() => window.location.href = 'http://localhost:3000/Admin'}
      >
        Admin
      </Typography>}
    </ul>
  );

  const navList2 = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 pl-10">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <button className="nav-btn">
          <Link to={'/Product'} className="flex items-center text-base">
            <span className='product-nav block'>
              {language == 1 ? 'Đồ chơi' : 'Toys'}
            </span>
          </Link>
        </button>
      </Typography>
      {!userCurrent && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <button className="nav-btn">
          <Link to={'/SignIn'} className="flex items-center text-base">
            <span className='login-nav lg:block'>
              {language == 1 ? 'Đăng nhập' : 'Sign In'}
            </span>
          </Link>
        </button>
      </Typography>}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <Menu open={openMenu} handler={setOpenMenu} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 hover:bg-transparent outline-none"
            >
              <svg className="text-lg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#050505" strokeWidth="1.5"><path d="M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12z"></path><path d="M16 12c0 1.313-.104 2.614-.305 3.827c-.2 1.213-.495 2.315-.867 3.244c-.371.929-.812 1.665-1.297 2.168c-.486.502-1.006.761-1.531.761c-.525 0-1.045-.259-1.53-.761c-.486-.503-.927-1.24-1.298-2.168c-.372-.929-.667-2.03-.868-3.244A23.614 23.614 0 0 1 8 12c0-1.313.103-2.614.304-3.827s.496-2.315.868-3.244c.371-.929.812-1.665 1.297-2.168C10.955 2.26 11.475 2 12 2c.525 0 1.045.259 1.53.761c.486.503.927 1.24 1.298 2.168c.372.929.667 2.03.867 3.244C15.897 9.386 16 10.687 16 12z"></path><path strokeLinecap="round" d="M2 12h20"></path></g></svg>
              <span className="language">{language == 1 ? 'Tiếng Việt' : 'English'}</span>
              {/* {language == 1 && <svg className="inline md:hidden text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64"><path fill="#ec1c24" d="M64 44c0 6.075-3.373 11-10 11H10C3.373 55 0 50.075 0 44V22c0-6.075 3.373-11 10-11h44c6.627 0 10 4.925 10 11z"></path><path fill="#f9cb38" d="m45.43 28.963l-9.997.015l-3.103-10.114l-3.08 10.114l-10.01-.015l8.106 6.157l-3.14 10.05l8.13-6.241l8.147 6.241l-3.147-10.05z"></path></svg>}
              {language == 2 && <svg className="inline md:hidden text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path><path fill="#CF1B2B" d="m25.14 23l9.712 6.801a4 4 0 0 0 .99-1.749L28.627 23zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943zm10-10h2.141l9.711-6.8a4 4 0 0 0-1.937-1.085L23 12.057zm-12.141 0L1.148 6.2a4 4 0 0 0-.991 1.749L7.372 13z"></path><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a4 4 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21zM36 9a3.98 3.98 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4 4 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059zM13 5v5.837L4.664 5H4a4 4 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A4 4 0 0 0 0 9v.059L5.628 13H0v2h15V5z"></path><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path></svg>} */}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""
                  }`}
              />
            </Button>
          </MenuHandler>
          {openNav && <MenuList>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.setItem('language', '1')
              setLanguage(1)
            }}>Tiếng Việt</MenuItem>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.setItem('language', '2')
              setLanguage(2)
            }}>English</MenuItem>
          </MenuList>}
        </Menu>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <Menu open={openCart} handler={setOpenCart} placement="bottom-end" allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 w-[50px] hover:bg-transparent outline-none py-0"
            >
              <div className="h-full w-full py-3" onClick={(e) => {
                e.preventDefault()
                if (!window.localStorage.getItem('User')) {
                  window.location.href = 'http://localhost:3000/SignIn';
                } else window.location.href = 'http://localhost:3000/Cart';
              }}>
                <Badge content={cartDetail ? cartDetail.length : '0'}>
                  <svg className="w-full h-full mr-1 text-xs md:text-base" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z" />
                  </svg>
                </Badge>
              </div>
            </Button>
          </MenuHandler>
          {openNav && <MenuList className="max-h-[374px] overflow-y-scroll">
            <Typography className='font-normal cursor-default text-gray-400 outline-none' variant="h6">Sản phẩm vừa thêm</Typography>
            {cartDetail.length != 0 ? cartDetail.map((item, index) => (
              <MenuItem key={index} className="text-black" style={{ borderBottom: '1px solid #ccc' }} onClick={(e) => {
                e.preventDefault()
                window.location.href = `/Product/Productdetail/${removeVietnameseAccents(item.name)}-${item.id}`
              }}>
                <div className="flex items-center justify-between w-[450px]">
                  <div className="flex items-center w-9/12">
                    <div className="w-[70px] h-[70px] mr-2">
                      <img className="w-full h-full" src={`http://localhost:8080/images/${item.img}`} />
                    </div>
                    <span className="w-9/12 cart-itemName">{item.name}</span>
                  </div>
                  <div className="cart-info text-end">
                    <div className="flex text-red-500">{formatNumber(Math.floor((item.price - (item.price * item.discount) / 100) / 1000) * 1000)} đ</div>
                    <div>SL: {item.quantityCurrent}</div>
                  </div>
                </div>
              </MenuItem>
            )) : ''}
          </MenuList>}
        </Menu>
      </Typography>
      {userCurrent && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black h-[40px]"
      >
        <Menu open={openMenuAccount} handler={setOpenMenuAccount} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 hover:bg-transparent"
            >
              <span className="language">{user.name}</span>
            </Button>
          </MenuHandler>
          {openNav && <MenuList>
            <Link to='/Account' className="hover:border-none outline-none">
              <MenuItem className="text-black outline-none">
                {language == 1 ? 'Tài khoản của tôi' : 'My account'}
              </MenuItem>
            </Link>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.removeItem('User')
              window.location.href = 'http://localhost:3000/'
            }}>
              {language == 1 ? 'Đăng xuất' : 'Log out'}
            </MenuItem>
          </MenuList>}
        </Menu>
      </Typography>}
      {user.level == 2 && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center text-base gap-x-2 py-1 pr-1 pl-4 font-medium text-black border-l-2 border-l-gray-400 hover:cursor-pointer"
        onClick={() => window.location.href = 'http://localhost:3000/Admin'}
      >
        Admin
      </Typography>}
    </ul>
  );

  return (
    <div className="w-full">
      <Navbar className="max-w-full px-4 py-2 lg:px-8 lg:py-4 bg-transparent backdrop-blur-none rounded-none border-black shadow-none">
        <div className="container min-w-full flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="brand-name mr-4 cursor-pointer py-1.5 font-medium text-2xl  leading-[50px]"
          >
            SkyWorld
          </Typography>
          <div className="hidden lg:block">{navList1}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container ">
            {navList2}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Nav;
