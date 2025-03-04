import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards } from '../../redux/cardSlice'
import { RootState } from '../../redux/store'
import { ThunkDispatch } from '@reduxjs/toolkit'
import MyCards from '../myCards'
import RecentTransactions from '../recentTransection'
import QuickTransfer from '../quickTransfer'
import MonthlyDataChart from '../monthlyDataAreaChart'
import DepositWithdrawChart from '../depositWithdrawBarChart'
import ExpensePieChart from '../expensePieChart'
import LoadingScreen from '../loadingScreen'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>()
  const { cards, status, error } = useSelector(
    (state: RootState) => state.cards
  )

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  if (status === 'loading') return <LoadingScreen />
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div className="w-full flex flex-col gap-[18px] p-[30px]">
      <div className="w-full flex justify-around gap-[18px]">
        <div className="w-[70%] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center ">
            <h2 className="heading-text">My Cards</h2>
            <button className="hover:text-indigo-600 font-medium text-primary-text-color">
              See All
            </button>
          </div>
          <MyCards cards={cards} />
        </div>
        <div className="w-[22%] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Recent Transaction</h2>
          </div>
          <RecentTransactions />
        </div>
      </div>
      <div className="w-full flex justify-around gap-[18px]">
        <div className="w-[70%] flex flex-col gap-[18px]">
          <h2 className="heading-text">Weekly Activity</h2>
          <DepositWithdrawChart />
        </div>

        <div className="w-[22%] flex flex-col gap-[18px]">
          <h2 className="heading-text">Expense Statistics</h2>
          <ExpensePieChart />
        </div>
      </div>
      <div className="w-full flex justify-around gap-[18px]">
        <div className="w-[30%] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Quick Transfer</h2>
          </div>
          <QuickTransfer />
        </div>
        <div className="w-[62%] flex flex-col gap-[18px]">
          <h2 className="heading-text">Balance History</h2>
          <MonthlyDataChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
