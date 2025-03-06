import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ICONS } from './constants/icons'

const Dashboard = lazy(() => import('./component/dashboard'))
const Setting = lazy(() => import('./component/setting'))
const SideBar = lazy(() => import('./component/sidebar'))
const Header = lazy(() => import('./component/header'))
const NotFound = lazy(() => import('./component/pageNotFound'))

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const { pathname } = location

  const navItems = useMemo(
    () => [
      { icon: ICONS.home, label: 'Overview', path: '/dashboard' },
      { icon: ICONS.transaction, label: 'Transactions', path: '/transactions' },
      { icon: ICONS.account, label: 'Accounts', path: '/accounts' },
      { icon: ICONS.investment, label: 'Investments', path: '/investments' },
      { icon: ICONS.creditCard, label: 'Credit Cards', path: '/credit-cards' },
      { icon: ICONS.loan, label: 'Loans', path: '/loans' },
      { icon: ICONS.service, label: 'Services', path: '/services' },
      { icon: ICONS.privilege, label: 'My Privileges', path: '/privileges' },
      { icon: ICONS.setting, label: 'Setting', path: '/setting' },
    ],
    []
  )

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) setIsSidebarOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-column justify-content-center align-items-center relative bg-[#F5F7FA]">
      <div
        className={`flex flex-col absolute right-0 w-full lg:w-[calc(100%-250px)] bg-[#F5F7FA] transition-all ${
          isSidebarOpen ? 'pointer-events-none overflow-hidden h-screen' : ''
        }`}
      >
        <Header
          pathname={pathname}
          navItems={navItems}
          toggleSidebar={toggleSidebar}
        />

        {isSidebarOpen && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-auto z-10" />
        )}

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App
