import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Define transaction type
interface Transaction {
  id: number
  description: string
  type: 'card' | 'paypal' | 'user'
  amount: number
  date: string
}

// Define initial state
interface TransactionState {
  transactions: Transaction[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TransactionState = {
  transactions: [],
  status: 'idle',
  error: null,
}

// Simulated API fetch using Promise
const mockFetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          description: 'Deposit from my Card',
          type: 'card',
          amount: -850,
          date: '28 January 2021',
        },
        {
          id: 2,
          description: 'Deposit Paypal',
          type: 'paypal',
          amount: 2500,
          date: '25 January 2021',
        },
        {
          id: 3,
          description: 'Jemi Wilson',
          type: 'user',
          amount: 5400,
          date: '21 January 2021',
        },
      ])
    }, 1500) // Simulating network delay
  })
}

// Async thunk using Promise
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transactions/fetchTransactions',
  async () => {
    return await mockFetchTransactions()
  }
)

// Transaction slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = 'succeeded'
          state.transactions = action.payload
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to fetch transactions'
      })
  },
})

export default transactionSlice.reducer
