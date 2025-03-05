import { useLocation } from 'react-router-dom'

import SideBar from '../sidebar'
import Header from '../header'

import home from '../../assets/icons/home.svg'
import transaction from '../../assets/icons/transfer.svg'
import account from '../../assets/icons/user.svg'
import investment from '../../assets/icons/economic-investment.svg'
import creditCard from '../../assets/icons/credit-card.svg'
import loan from '../../assets/icons/loan.svg'
import service from '../../assets/icons/service.svg'
import privilege from '../../assets/icons/econometrics.svg'
import setting from '../../assets/icons/settings.svg'

const Home = () => {
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
    <div>
      <SideBar pathname={pathname} navItems={navItems} />
      <Header pathname={pathname} navItems={navItems} />
    </div>
  )
}

export default Home
