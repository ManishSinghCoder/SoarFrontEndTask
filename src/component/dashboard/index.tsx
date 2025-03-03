import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards } from '../../redux/cardSlice'
import { RootState } from '../../redux/store'
import { ThunkDispatch } from '@reduxjs/toolkit'

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
    <div>
      <h2>My Cards</h2>
      {cards.map((card) => (
        <div key={card.id}>
          <p>Name: {card.name}</p>
          <p>Balance: ${card.balance}</p>
          <p>Card Number: {card.cardNumber}</p>
          <p>Valid Through: {card.validThrough}</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
