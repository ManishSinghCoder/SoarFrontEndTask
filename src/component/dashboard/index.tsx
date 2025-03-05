import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards } from '../../redux/cardSlice'
import { AppDispatch, RootState } from '../../redux/store'

import MyCards from '../myCards'
import RecentTransactions from '../recentTransection'
import QuickTransfer from '../quickTransfer'
import MonthlyDataChart from '../monthlyDataAreaChart'
import DepositWithdrawChart from '../depositWithdrawBarChart'
import ExpensePieChart from '../expensePieChart'
import LoadingScreen from '../loadingScreen'
import { fetchContacts } from '../../redux/quickTransferSlice'
import { fetchTransactions } from '../../redux/transactionSlice'
import { fetchBarGraphData } from '../../redux/barGraphSlice'
import { fetchLineGraphData } from '../../redux/lineGraphSlice'
import { fetchPieChartData } from '../../redux/pieChartSlice'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cards, status, error } = useSelector(
    (state: RootState) => state.cards
  )
  const { contacts, contactStatus, contactsError } = useSelector(
    (state: RootState) => state.contacts
  )
  const { transactions, transectionStatus, transectionsError } = useSelector(
    (state: RootState) => state.recentTransactions
  )
  const {
    dipositWithdrawDatasets,
    dipositeWithdrawLabels,
    barStatus,
    barError,
  } = useSelector((state: RootState) => state.barGraph)
  const { lineDatasets, lineLabels, lineError, lineStatus } = useSelector(
    (state: RootState) => state.lineGraph
  )
  const { pieChartLabels, pieChartDatasets, pieChartError, pieChartStatus } =
    useSelector((state: RootState) => state.pieChart)

  useEffect(() => {
    dispatch(fetchCards())
    dispatch(fetchContacts())
    dispatch(fetchTransactions())
    dispatch(fetchBarGraphData())
    dispatch(fetchLineGraphData())
    dispatch(fetchPieChartData())
  }, [dispatch])

  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const [atEnd, setAtEnd] = useState(false)

  const handleToggleScroll = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo({
        left: atEnd ? 0 : cardsContainerRef.current.scrollWidth,
        behavior: 'smooth',
      })
      setAtEnd(!atEnd)
    }
  }

  if (
    status === 'loading' ||
    contactStatus === 'loading' ||
    transectionStatus === 'loading' ||
    barStatus === 'loading' ||
    lineStatus === 'loading' ||
    pieChartStatus === 'loading'
  )
    return <LoadingScreen isError={false}/>
  if (
    error === 'failed' ||
    contactsError === 'failed' ||
    transectionsError === 'failed' ||
    barError === 'failed' ||
    lineError === 'failed' ||
    pieChartError === 'failed'
  )
    return <LoadingScreen isError={true} />

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
            <MyCards cards={cards} />
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
