import { Route, Routes, useLocation } from 'react-router-dom'
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

function App() {
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
  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <div className="flex flex-col absolute right-0 w-[calc(100%-250px)] bg-[#F5F7FA]">
        <Header pathname={pathname} navItems={navItems} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
      <SideBar pathname={pathname} navItems={navItems} />
    </div>
  )
}

export default App
