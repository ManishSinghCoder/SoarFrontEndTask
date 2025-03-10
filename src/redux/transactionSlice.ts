import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Transaction } from '../constants/type'
import { ICONS } from '../constants/icons'


interface TransactionState {
  transactions: Transaction[]
  transectionStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  transectionsError: string | null
}

const initialState: TransactionState = {
  transactions: [],
  transectionStatus: 'idle',
  transectionsError: null,
}

const mockFetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Deposit from my Card',
          date: '28 January 2021',
          amount: '-$850',
          icon: ICONS.masterCard,
          iconBg: 'bg-yellow-100',
          amountColor: 'text-red-500',
      },
      {
          id: 2,
          title: 'Deposit Paypal',
          date: '25 January 2021',
          amount: '+$2,500',
          icon: ICONS.paypal,
          iconBg: 'bg-blue-100',
          amountColor: 'text-green-500',
      },
      {
          id: 3,
          title: 'Jemi Wilson',
          date: '21 January 2021',
          amount: '+$5,400',
          icon: ICONS.currency,
          iconBg: 'bg-cyan-100',
          amountColor: 'text-green-500',
      },
      ])
    }, 1500)
  })
}

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transactions/fetchTransactions',
  async () => {
    return await mockFetchTransactions()
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.transectionStatus = 'loading'
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.transectionStatus = 'succeeded'
          state.transactions = action.payload
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.transectionStatus = 'failed'
        state.transectionsError = action.error.message ?? 'Failed to fetch transactions'
      })
  },
})

export default transactionSlice.reducer
