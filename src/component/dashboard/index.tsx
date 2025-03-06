import React, {
  useRef,
  useState,
  useCallback,
  lazy,
  Suspense,
  useMemo,
} from 'react'
import { useDispatch } from 'react-redux'
import { setNumber } from '../../redux/cardSlice'
import { AppDispatch } from '../../redux/store'

import useFetchDashboardData from './useFetchDashboardData'
import LoadingScreen from '../loadingScreen'

const MyCards = lazy(() => import('../myCards'))
const RecentTransactions = lazy(() => import('../recentTransection'))
const QuickTransfer = lazy(() => import('../quickTransfer'))
const MonthlyDataChart = lazy(() => import('../monthlyDataAreaChart'))
const DepositWithdrawChart = lazy(() => import('../depositWithdrawBarChart'))
const ExpensePieChart = lazy(() => import('../expensePieChart'))

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
  } = useMemo(() => initialDashboardData, [initialDashboardData])

  const handleToggleScroll = useCallback(() => {
    dispatch(setNumber(cards.length))
    if (cardsContainerRef.current) {
      requestAnimationFrame(() => {
        cardsContainerRef.current?.scrollTo({
          left: atEnd ? 0 : cardsContainerRef.current.scrollWidth,
          behavior: 'smooth',
        })
        setAtEnd(!atEnd)
      })
    }
  }, [atEnd, cards.length, dispatch])

  if (isLoading) return <LoadingScreen isError={false} />
  if (isError) return <LoadingScreen isError={true} />

  return (
    <div className="w-full flex flex-col gap-[18px] md:p-[30px] pl-6 py-6">
      <div className="w-full flex flex-col md:flex-row justify-center gap-[18px] items-stretch">
        <div className="w-[100%] md:w-[calc(100%-355px)] flex flex-col gap-[18px]">
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
            <Suspense fallback={<LoadingScreen isError={false} />}>
              <MyCards cards={cards} number={number} />
            </Suspense>
          </div>
        </div>

        <div className="w-[100%] md:w-[340px] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Recent Transaction</h2>
          </div>
          <div className="flex-1 bg-transparent md:bg-white rounded-3xl p-[20px] flex items-center max-h-[290px]">
            <Suspense fallback={<LoadingScreen isError={false} />}>
              <RecentTransactions transactions={transactions} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center gap-[18px]">
        <div className="w-[100%] md:w-[calc(100%-355px)] flex flex-col gap-[18px]">
          <h2 className="heading-text">Weekly Activity</h2>
          <Suspense fallback={<LoadingScreen isError={false} />}>
            <DepositWithdrawChart
              dipositeWithdrawLabels={dipositeWithdrawLabels}
              dipositWithdrawDatasets={dipositWithdrawDatasets}
            />
          </Suspense>
        </div>

        <div className="w-[100%] md:w-[340px] flex flex-col gap-[18px]">
          <h2 className="heading-text">Expense Statistics</h2>
          <Suspense fallback={<LoadingScreen isError={false} />}>
            <ExpensePieChart
              pieChartLabels={pieChartLabels}
              pieChartDatasets={pieChartDatasets}
            />
          </Suspense>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center gap-[18px]">
        <div className="w-[100%] md:w-[420px] flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h2 className="heading-text">Quick Transfer</h2>
          </div>
          <Suspense fallback={<LoadingScreen isError={false} />}>
            <QuickTransfer contacts={contacts} />
          </Suspense>
        </div>

        <div className="w-[100%] md:w-[calc(100%-438px)] flex flex-col gap-[18px]">
          <h2 className="heading-text">Balance History</h2>
          <Suspense fallback={<LoadingScreen isError={false} />}>
            <MonthlyDataChart
              monthlyDateLabels={lineLabels}
              monthlyDatasets={lineDatasets}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
