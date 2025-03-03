import React from 'react'
import SideBar from '../sidebar'
import Header from '../header'
import home from '../../asset/icons/home.svg'
import transaction from '../../asset/icons/transfer.svg'
import account from '../../asset/icons/user.svg'
import investment from '../../asset/icons/economic-investment.svg'
import creditCard from '../../asset/icons/credit-card.svg'
import loan from '../../asset/icons/loan.svg'
import service from '../../asset/icons/service.svg'
import privilege from '../../asset/icons/econometrics.svg'
import setting from '../../asset/icons/settings.svg'
import { useLocation } from 'react-router-dom'

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
