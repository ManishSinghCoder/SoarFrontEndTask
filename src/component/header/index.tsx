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
  return (
    <header className="flex h-[100px] items-center justify-between border-b border-gray-200 pr-[40px]">
      <div className="flex w-full items-center justify-between pl-[40px]">
        <h1 className="text-2xl font-semibold text-gray-800">
          {navItems.find((item) => item.path === pathname)?.label}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /> */}
            <input
              type="text"
              placeholder="Search for something"
              className="h-10 w-64 rounded-full bg-gray-100 pl-10 pr-4 text-sm focus:outline-none"
              //   onChange={handleChange}
            />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            {/* <Settings className="h-5 w-5" /> */}
          </div>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            {/* <Bell className="h-5 w-5" /> */}
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              1
            </span>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2s7AH3CzGGPEwCw66GpaPtlffjcTA4.png"
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
