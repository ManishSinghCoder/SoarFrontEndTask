import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNumber } from '../../redux/cardSlice'
import { AppDispatch } from '../../redux/store'

import MyCards from '../myCards'
import RecentTransactions from '../recentTransection'
import QuickTransfer from '../quickTransfer'
import MonthlyDataChart from '../monthlyDataAreaChart'
import DepositWithdrawChart from '../depositWithdrawBarChart'
import ExpensePieChart from '../expensePieChart'
import useFetchDashboardData from './useFetchDashboardData'
import LoadingScreen from '../loadingScreen'

const Dashboard: React.FC = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [atEnd, setAtEnd] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { initialDashboardData, isError, isLoading } = useFetchDashboardData()

  const {
    cards,
    contacts,
    transactions,
    dipositWithdrawDatasets,
    dipositeWithdrawLabels,
    lineDatasets,
    lineLabels,
    pieChartLabels,
    pieChartDatasets,
    number,
  } = initialDashboardData

  const handleToggleScroll = () => {
    dispatch(setNumber(cards.length))
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo({
        left: atEnd ? 0 : cardsContainerRef.current.scrollWidth,
        behavior: 'smooth',
      })
      setAtEnd(!atEnd)
    }
  }

  if (isLoading) return <LoadingScreen isError={false} />
  if (isError) return <LoadingScreen isError={true} />

  return (
    <div className="w-full flex flex-col gap-[18px] md:p-[30px] pl-6 py-6">
      <div className="w-full flex flex-col md:flex-row justify-center gap-[18px] items-stretch">
        <div className="w-[100%] md:w-[calc(100%-355px)] flex flex-col gap-[18px] ">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">My Cards</h2>
            <button
              className="hover:text-indigo-600 font-medium text-primary-text-color pr-6 md:pr-0"
              onClick={handleToggleScroll}
            >
              See All
            </button>
          </div>
          <div
            ref={cardsContainerRef}
            className="flex-1 max-h-[290px] w-full scrollBarDesign overflow-x-auto overflow-y-hidden whitespace-nowrap"
          >
            <MyCards cards={cards} number={number} />
          </div>
        </div>

        <div className="w-[100%] md:w-[340px] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Recent Transaction</h2>
          </div>
          <div className="flex-1 bg-transparent  md:bg-white rounded-3xl p-[20px] flex items-center max-h-[290px]">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center gap-[18px]">
        <div className=" w-[100%] md:w-[calc(100%-355px)] flex flex-col gap-[18px]">
          <h2 className="heading-text">Weekly Activity</h2>
          <DepositWithdrawChart
            dipositeWithdrawLabels={dipositeWithdrawLabels}
            dipositWithdrawDatasets={dipositWithdrawDatasets}
          />
        </div>

        <div className=" w-[100%] md:w-[340px]  flex flex-col gap-[18px]">
          <h2 className="heading-text">Expense Statistics</h2>
          <ExpensePieChart
            pieChartLabels={pieChartLabels}
            pieChartDatasets={pieChartDatasets}
          />
        </div>
      </div>
      <div className="w-full flex  flex-col md:flex-row justify-center gap-[18px]">
        <div className="w-[100%] md:w-[420px] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Quick Transfer</h2>
          </div>
          <QuickTransfer contacts={contacts} />
        </div>
        <div className=" w-[100%] md:w-[calc(100%-438px)] flex flex-col gap-[18px]">
          <h2 className="heading-text">Balance History</h2>
          <MonthlyDataChart
            monthlyDateLabels={lineLabels}
            monthlyDatasets={lineDatasets}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
