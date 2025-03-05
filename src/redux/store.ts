import { configureStore } from '@reduxjs/toolkit'

import cardReducer from './cardSlice'
import transactionSlice from './transactionSlice'
import formReducer from './formSlice'
import contactsSlice from "./quickTransferSlice"
import barGraph from "./barGraphSlice"
import lineGraph from "./lineGraphSlice"
import pieChart from './pieChartSlice'

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    recentTransactions: transactionSlice,
    profile: formReducer,
    contacts: contactsSlice,
    barGraph: barGraph,
    lineGraph: lineGraph,
    pieChart: pieChart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['profile.selectedDate'],
        ignoredActions: ['profile/selectDateFromPicker'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
