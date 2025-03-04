import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './cardSlice'
import transactionSlice from './transactionSlice'
import formReducer from './formSlice'

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    recentTransactions: transactionSlice,
    profile: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['profile.selectedDate'], // Ignore specific paths
        ignoredActions: ['profile/selectDateFromPicker'], // Ignore actions that store non-serializable values
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
