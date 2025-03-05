import { Link } from 'react-router-dom'
import soarIcon from '../../assets/icons/mingcute_task-fill.svg'

interface navItems {
  icon: string
  label: string
  path: string
}

interface sidebarProps {
  pathname: string
  navItems: navItems[]
  toggleSidebar?: () => void
  isSidebarOpen?: boolean
}

const SideBar = ({
  pathname,
  navItems,
  toggleSidebar,
  isSidebarOpen,
}: sidebarProps) => {
  
  return (
    <div className=" w-[300px] z-10 md:w-[300px] lg:w-[250px] bg-white h-screen border-r border-[#E6EFF5] relative left-0">
      <div className="flex items-center w-[250px] text-gray-400 h-[100px]  pl-[40px]">
        <Link to="/" className="flex items-center gap-[10px]">
          <img src={soarIcon} className="w-[35px] h-[35px]" alt="soar icon" />
          <div className="font-inter text-[25px] text-[#343c6a] font-extrabold">
            Soar Task
          </div>
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl px-2 py-1 text-center absolute top-9 lg:top-4 right-5 rounded-3xl  lg:hidden"
        >
          <svg
            fill="#BDBDBD"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "></polygon>{' '}
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
      {navItems.map((item) => (
        <div key={item.path} onClick={isSidebarOpen ? toggleSidebar : () => {}}>
          <Link to={item.path}>
            <div
              className={`relative flex items-center py-[15px] px-4  ${pathname === item.path ? 'opacity-100' : 'opacity-30'} hover:opacity-100`}
            >
              {pathname === item.path && (
                <div className="absolute left-0 top-0 h-full w-[5px] bg-[#2d3748] rounded-tr-lg rounded-br-lg"></div>
              )}

              <img
                src={item.icon}
                className={`w-[25px] h-[25px] ml-[35px]`}
                alt={item.label}
              />
              <div className={`ml-3 text-[#232323] font-inter`}>
                {item.label === 'Overview' ? 'Dashboard' : item.label}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SideBar
