import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './cardSlice'
import transactionSlice from './transactionSlice'

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    recentTransactions: transactionSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
