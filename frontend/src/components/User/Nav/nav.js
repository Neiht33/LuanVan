import React from "react";
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
  const [openNav, setOpenNav] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [openMenuAccount, setOpenMenuAccount] = React.useState(false);
  const [userCurrent, setUserCurrent] = React.useState(false)
  const [user, setUser] = React.useState({})

  React.useLayoutEffect(() => {
    if (window.localStorage.getItem('User')) {
      setUser(JSON.parse(window.localStorage.getItem('User')))
      setUserCurrent(true)
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );

  }, []);

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

  const navList = (
    <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-sm">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <button className="nav-btn">
          {/* <svg className="text-xl mr-1 lg:text-xl sm:text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 15q-1.25 0-2.125-.875T1 12t.875-2.125T4 9V5h5q0-1.25.875-2.125T12 2t2.125.875T15 5h5v4q1.25 0 2.125.875T23 12t-.875 2.125T20 15v6H4zm5-2q.625 0 1.063-.437T10.5 11.5t-.437-1.062T9 10t-1.062.438T7.5 11.5t.438 1.063T9 13m6 0q.625 0 1.063-.437T16.5 11.5t-.437-1.062T15 10t-1.062.438T13.5 11.5t.438 1.063T15 13m-7 4h8v-2H8z"></path></svg> */}
          <Link to={'/Product'} className="flex items-center text-base">
            <span className='product-nav hidden lg:block'>
              {language == 1 ? 'Đồ chơi' : 'Toys'}
            </span>
          </Link>
        </button>
      </Typography>
      {!userCurrent && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <button className="nav-btn">
          {/* <svg className="text-xl mr-1 lg:text-xl sm:text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13q1.45 0 2.475-1.025T15.5 9.5t-1.025-2.475T12 6T9.525 7.025T8.5 9.5t1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-1.15q-1.35-1.325-3.137-2.087T12 15t-3.863.763T5 17.85z"></path></svg> */}
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
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <Menu open={openMenu} handler={setOpenMenu} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 hover:bg-transparent outline-none"
            >
              <svg className="text-lg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#050505" strokeWidth="1.5"><path d="M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12z"></path><path d="M16 12c0 1.313-.104 2.614-.305 3.827c-.2 1.213-.495 2.315-.867 3.244c-.371.929-.812 1.665-1.297 2.168c-.486.502-1.006.761-1.531.761c-.525 0-1.045-.259-1.53-.761c-.486-.503-.927-1.24-1.298-2.168c-.372-.929-.667-2.03-.868-3.244A23.614 23.614 0 0 1 8 12c0-1.313.103-2.614.304-3.827s.496-2.315.868-3.244c.371-.929.812-1.665 1.297-2.168C10.955 2.26 11.475 2 12 2c.525 0 1.045.259 1.53.761c.486.503.927 1.24 1.298 2.168c.372.929.667 2.03.867 3.244C15.897 9.386 16 10.687 16 12z"></path><path strokeLinecap="round" d="M2 12h20"></path></g></svg>
              <span className="language">{language == 1 ? 'Tiếng Việt' : 'English'}</span>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""
                  }`}
              />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.setItem('language', '1')
              setLanguage(1)
            }}>Tiếng Việt</MenuItem>
            <MenuItem className="text-black" onClick={() => {
              window.localStorage.setItem('language', '2')
              setLanguage(2)
            }}>English</MenuItem>
          </MenuList>
        </Menu>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <button className="">
          <div className="flex items-center">
            <svg className="mr-1 sm:text-xs lg:text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#050505" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"></path></svg>
          </div>
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
      >
        <Menu open={openCart} handler={setOpenCart} placement="bottom-end" allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 text-base font-normal capitalize tracking-normal px-0 w-[50px] hover:bg-transparent outline-none"
            >
              <Badge content={cartDetail ? cartDetail.length : '0'}>
                <svg className="w-full h-full mr-1 sm:text-xs lg:text-base" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" onClick={(e) => {
                  e.preventDefault()
                  if (!window.localStorage.getItem('User')) {
                    window.location.href = 'http://localhost:3000/SignIn';
                  } else window.location.href = 'http://localhost:3000/Cart';
                }}>
                  <path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z" />
                </svg>
              </Badge>
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[374px] overflow-y-scroll">
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
                    <div className="flex text-red-500">{formatNumber(item.price)} đ</div>
                    <div>SL: {item.quantityCurrent}</div>
                  </div>
                </div>
              </MenuItem>
            )) : ''}
          </MenuList>
        </Menu>
      </Typography>
      {userCurrent && <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-black"
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
          <MenuList>
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
          </MenuList>
        </Menu>
      </Typography>}
    </ul>
  );

  return (
    <>
      <div className="nav-main px-8 lg:px-8 w-full rounded-none">
        <div className="w-full flex flex-wrap items-center sm:justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="brand-name mr-4 cursor-pointer py-1.5 font-medium text-2xl"
          >
            SkyWorld
          </Typography>
          {/* <div className="hidden items-center gap-x-2 xl:flex">
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
          </div> */}
          <div className="sm:block">{navList}</div>
        </div>
      </div>
    </>
  );
}

export default Nav;
