import React, { useEffect, useRef, useState } from 'react'
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
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [atEnd, setAtEnd] = useState(false);

  const handleToggleScroll = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo({
        left: atEnd ? 0 : cardsContainerRef.current.scrollWidth, 
        behavior: "smooth", 
      });
      setAtEnd(!atEnd); 
    }
  };


  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  if (status === 'loading') return <LoadingScreen />
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div className="w-full flex flex-col gap-[18px] md:p-[30px] pl-6 py-6">
      <div className="w-full flex flex-col md:flex-row justify-center gap-[18px] items-stretch">
        <div className="w-[100%] md:w-[calc(100%-355px)] flex flex-col gap-[18px] ">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">My Cards</h2>
            <button className="hover:text-indigo-600 font-medium text-primary-text-color pr-6 md:pr-0" onClick={handleToggleScroll}>
              See All
            </button>
          </div>
          <div ref={cardsContainerRef} className="flex-1 max-h-[260px] w-full overflow-x-auto whitespace-nowrap  ">
            <MyCards cards={cards} />
          </div>
        </div>

        <div className="w-[100%] md:w-[340px] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Recent Transaction</h2>
          </div>
          <div className="flex-1 bg-transparent  md:bg-white rounded-3xl p-[20px] flex items-center max-h-[260px]">
            <RecentTransactions />
          </div>
        </div>
      </div>

      <div className="w-full flex   flex-col md:flex-row justify-center gap-[18px]">
        <div className=" w-[100%] md:w-[calc(100%-355px)] flex flex-col gap-[18px]">
          <h2 className="heading-text">Weekly Activity</h2>
          <DepositWithdrawChart />
        </div>

        <div className=" w-[100%] md:w-[340px]  flex flex-col gap-[18px]">
          <h2 className="heading-text">Expense Statistics</h2>
          <ExpensePieChart />
        </div>
      </div>
      <div className="w-full flex  flex-col md:flex-row justify-center gap-[18px]">
        <div className="w-[100%] md:w-[360px] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Quick Transfer</h2>
          </div>
          <QuickTransfer />
        </div>
        <div className=" w-[100%] md:w-[calc(100%-378px)] flex flex-col gap-[18px]">
          <h2 className="heading-text">Balance History</h2>
          <MonthlyDataChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
