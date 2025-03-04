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
}

const SideBar = ({ pathname, navItems }: sidebarProps) => {
  return (
    <div className="w-[250px] bg-white h-screen border-r border-[#E6EFF5] relative left-0">
      <div className="flex items-center w-[250px] text-gray-400 h-[100px]  pl-[40px]">
        <Link to="/" className="flex items-center gap-[10px]">
          <img src={soarIcon} className="w-[35px] h-[35px]" alt="soar icon" />
          <div className="font-inter text-[25px] text-[#343c6a] font-extrabold">
            Soar Task
          </div>
        </Link>
      </div>
      {navItems.map((item) => (
        <div key={item.path}>
          <Link to={item.path}>
            <div
              className={`relative flex items-center py-[15px] px-4 py-3 ${pathname === item.path ? 'opacity-100' : 'opacity-30'} hover:opacity-100`}
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
