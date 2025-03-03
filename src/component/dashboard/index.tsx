import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards } from '../../redux/cardSlice'
import { RootState } from '../../redux/store'
import { ThunkDispatch } from '@reduxjs/toolkit'
import MyCards from '../myCards'
import RecentTransactions from '../recentTransection'
import QuickTransfer from '../quickTransfer'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>()
  const { cards, status, error } = useSelector(
    (state: RootState) => state.cards
  )

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div className="w-full flex flex-col gap-5 p-[30px]">
      <div className="w-full flex justify-around ">
        <div className="w-[70%] flex flex-col gap-10">
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl font-semibold text-gray-700">My Cards</h2>
            <button className="hover:text-indigo-600 font-medium">
              See All
            </button>
          </div>
          <MyCards cards={cards} />
        </div>
        <div className="w-[25%] flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700 ">
              Recent Transaction
            </h2>
          </div>
          <RecentTransactions />
        </div>
      </div>
      <div></div>
      <div className="w-full flex justify-around ">
        <div className="w-[30%] ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Quick Transfer</h2>
          </div>
          <QuickTransfer />
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Dashboard
