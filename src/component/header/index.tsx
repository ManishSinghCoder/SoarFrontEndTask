import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import React from 'react'
import LazyImage from '../lazyImage'
import { ICONS } from '../../constants/icons'

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
  const formData = useSelector((state: RootState) => state.profile.formData)

  return (
    <>
      <header className="flex h-[100px] items-center justify-between lg:border-b border-gray-200 pr-[40px] bg-white">
        <div className="flex w-full items-center justify-between pl-[40px]">
          <div className="lg:hidden" onClick={toggleSidebar}>
            <LazyImage
              imgClassName="cursor-pointer w-5 h-5"
              src={ICONS.hamburger}
              alt="hamburger icon"
            />
          </div>
          <h1 className="heading-text">
            {navItems.find((item) => item.path === pathname)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className=" hidden md:block relative">
              <LazyImage
                imgClassName="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                src={ICONS.search}
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
              <LazyImage src={ICONS.navSetting} alt="setting icon" />
            </div>
            <div className=" hidden md:flex  relative cursor-pointer  h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <LazyImage src={ICONS.notification} alt="notification icon" />
              <span className="absolute font-inter right-[5px] top-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                0
              </span>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <LazyImage
                src={formData.profilePicture}
                alt="Profile"
                imgClassName="h-[40px] w-[40px] object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="md:hidden w-full flex items-center justify-center px-[20px] pb-[20px] bg-white  relative">
        <LazyImage
          imgClassName=" absolute left-[30px]  h-4 w-4  text-gray-400"
          src={ICONS.search}
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
