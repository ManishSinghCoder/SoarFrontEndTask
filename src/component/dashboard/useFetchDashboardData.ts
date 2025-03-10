import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import { fetchCards } from '../../redux/cardSlice'
import { fetchContacts } from '../../redux/quickTransferSlice'
import { fetchTransactions } from '../../redux/transactionSlice'
import { fetchBarGraphData } from '../../redux/barGraphSlice'
import { fetchLineGraphData } from '../../redux/lineGraphSlice'
import { fetchPieChartData } from '../../redux/pieChartSlice'
import { AppDispatch, RootState } from '../../redux/store'

const useFetchDashboardData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isMounted = useRef(false)
  const initialDashboardData = useSelector((state: RootState) => ({
    ...state.cards,
    ...state.contacts,
    ...state.recentTransactions,
    ...state.barGraph,
    ...state.lineGraph,
    ...state.pieChart,
  }))

  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    const fetchData = async () => {
      try {
        const fetchPromises = [
          dispatch(fetchContacts()),
          dispatch(fetchTransactions()),
          dispatch(fetchBarGraphData()),
          dispatch(fetchLineGraphData()),
          dispatch(fetchPieChartData()),
          dispatch(fetchCards()),
        ]

        toast.promise(Promise.all(fetchPromises), {
          loading: 'Fetching data...',
          success: 'All data fetched successfully!',
          error: 'Failed to fetch some data.',
        })
      } catch (error) {
        toast.error('Error fetching data:')
      }
    }

    fetchData()
  }, [dispatch])

  const isLoading = Object.values(initialDashboardData).some(
    (status) => status === 'loading'
  )

  const isError = Object.values(initialDashboardData).some(
    (error) => error === 'failed'
  )

  return { isLoading, isError, initialDashboardData }
}

export default useFetchDashboardData
