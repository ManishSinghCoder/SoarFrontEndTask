import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import settingIcon from '../../assets/icons/settingsIcon.svg'
import notificationIcon from '../../assets/icons/notificationIcon.svg'
import hamburgerIcon from '../../assets/icons/hamburger.svg'
import searchIcon from '../../assets/icons/searchIcon.svg'
import React from 'react'

interface navItems {
  icon: string
  label: string
  path: string
}
interface IHeaderProps {
  pathname: string
  navItems: navItems[]
  toggleSidebar?: () => void
}
const Header = ({ pathname, navItems, toggleSidebar }: IHeaderProps) => {
  const profileImage = useSelector(
    (state: RootState) => state.profile.profileImage
  )
  return (
    <>
      <header className="flex h-[100px] items-center justify-between lg:border-b border-gray-200 pr-[40px] bg-white">
        <div className="flex w-full items-center justify-between pl-[40px]">
          <img
            className="cursor-pointer w-5 h-5  lg:hidden"
            src={hamburgerIcon}
            alt="hamburger icon"
            onClick={toggleSidebar}
          />
          <h1 className="heading-text">
            {navItems.find((item) => item.path === pathname)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className=" hidden md:block relative">
              <img
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                src={searchIcon}
                alt="search icon"
              />
              <input
                type="text"
                placeholder="Search for something"
                className="h-10 w-64 rounded-full bg-gray-100 pl-10 pr-4 text-sm font-inter focus:outline-none"
                //   onChange={handleChange}
              />
            </div>
            <div className="hidden md:flex cursor-pointer h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <img src={settingIcon} alt="setting icon" />
            </div>
            <div className=" hidden md:flex  relative cursor-pointer  h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <img src={notificationIcon} alt="notification icon" />
              <span className="absolute font-inter right-[5px] top-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                0
              </span>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={profileImage}
                alt="Profile"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="md:hidden w-full flex items-center justify-center px-[20px] pb-[20px] bg-white  relative">
        <img
          className=" absolute left-[30px]  h-4 w-4  text-gray-400"
          src={searchIcon}
          alt="search icon"
        />
        <input
          type="text"
          placeholder="Search for something"
          className="h-10 w-full rounded-2xl bg-gray-100 pl-10 pr-4 text-sm font-inter focus:outline-none"
          //   onChange={handleChange}
        />
      </div>
    </>
  )
}

export default React.memo(Header)
