import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Define Types
interface Card {
  id: number
  name: string
  balance: number
  cardNumber: string // Full number, will mask it in UI
  validThrough: string // Expiry date MM/YY
}

// Define initial state
interface CardState {
  cards: Card[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Initial state
const initialState: CardState = {
  cards: [],
  status: 'idle',
  error: null,
}

// Simulated API call using Promises
const mockFetchCards = (): Promise<Card[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'John Doe',
          balance: 5000,
          cardNumber: '1234 5678 9012 3456',
          validThrough: '2027-12-31T23:59:59Z',
        },
        {
          id: 2,
          name: 'Jane Smith',
          balance: 3200,
          cardNumber: '9876 5432 1098 7654',
          validThrough: '2026-08-31T23:59:59Z',
        },
      ])
    }, 1500) // Simulating delay
  })
}

// Async thunk to fetch cards
export const fetchCards = createAsyncThunk<Card[]>(
  'cards/fetchCards',
  async () => {
    return await mockFetchCards()
  }
)

// Redux slice
const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.status = 'succeeded'
        state.cards = action.payload
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to fetch cards'
      })
  },
})

export default cardSlice.reducer
