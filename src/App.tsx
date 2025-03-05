import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './component/dashboard'
import Setting from './component/setting'
// import PageNotFound from './component/pageNotFound'
import home from './assets/icons/home.svg'
import transaction from './assets/icons/transfer.svg'
import account from './assets/icons/user.svg'
import investment from './assets/icons/economic-investment.svg'
import creditCard from './assets/icons/credit-card.svg'
import loan from './assets/icons/loan.svg'
import service from './assets/icons/service.svg'
import privilege from './assets/icons/econometrics.svg'
import setting from './assets/icons/settings.svg'
import SideBar from './component/sidebar'
import Header from './component/header'
import NotFound from './component/pageNotFound'
import { useEffect, useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { icon: home, label: 'Overview', path: '/dashboard' },
    { icon: transaction, label: 'Transactions', path: '/transactions' },
    { icon: account, label: 'Accounts', path: '/accounts' },
    { icon: investment, label: 'Investments', path: '/investments' },
    { icon: creditCard, label: 'Credit Cards', path: '/credit-cards' },
    { icon: loan, label: 'Loans', path: '/loans' },
    { icon: service, label: 'Services', path: '/services' },
    { icon: privilege, label: 'My Privileges', path: '/privileges' },
    { icon: setting, label: 'Setting', path: '/setting' },
  ]

  const location = useLocation()
  const { pathname } = location

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }
  useEffect(() => {
    const handleResize = () => {
      if (isSidebarOpen && window.innerWidth > 600) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isSidebarOpen])

  return (
    <div className="flex flex-column justify-content-center align-items-center relative bg-[#F5F7FA]">
      <div
        className={`flex flex-col absolute right-0 w-full lg:w-[calc(100%-250px)] bg-[#F5F7FA] transition-all  ${isSidebarOpen ? 'md:block md:pointer-events-none overflow-hidden' : ''}`}
      >
        <Header
          pathname={pathname}
          navItems={navItems}
          toggleSidebar={toggleSidebar}
        />

        {isSidebarOpen && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-auto z-10" />
        )}

        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard  isSidebarOpen={isSidebarOpen}/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
      {isSidebarOpen && (
        <SideBar
          pathname={pathname}
          navItems={navItems}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      )}
      <div className="hidden lg:block">
        <SideBar pathname={pathname} navItems={navItems} />
      </div>
    </div>
  )
}

export default App
