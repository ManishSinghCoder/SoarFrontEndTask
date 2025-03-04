import settingIcon from '../../assets/icons/settingsIcon.svg'
import notificationIcon from '../../assets/icons/notificationIcon.svg'
import searchIcon from '../../assets/icons/searchIcon.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

interface navItems {
  icon: string
  label: string
  path: string
}
interface headerProps {
  pathname: string
  navItems: navItems[]
}
const Header = ({ pathname, navItems }: headerProps) => {
  const profileImage = useSelector(
    (state: RootState) => state.profile.profileImage
  )
  return (
    <header className="flex h-[100px] items-center justify-between border-b border-gray-200 pr-[40px] bg-white">
      <div className="flex w-full items-center justify-between pl-[40px]">
        <h1 className="heading-text">
          {navItems.find((item) => item.path === pathname)?.label}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
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
          <div className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <img src={settingIcon} alt="setting icon" />
          </div>
          <div className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
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
  )
}

export default Header
