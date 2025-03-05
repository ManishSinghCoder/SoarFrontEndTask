import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Card } from '../constent/type'


interface CardState {
  cards: Card[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CardState = {
  cards: [],
  status: 'idle',
  error: null,
}

const mockFetchCards = (): Promise<Card[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'John Doe',
          balance: '$5,000',
          cardNumber: '1234 5678 9012 3456',
          validThrough: '12/22',
          variant: 'dark',
        },
        {
          id: 2,
          name: 'Jane Smith',
          balance: '$3,200',
          cardNumber: '9876 5432 1098 7654',
          validThrough: '12/22',
          variant: 'light',
        },
      ])
    }, 1500)
  })
}

export const fetchCards = createAsyncThunk<Card[]>(
  'cards/fetchCards',
  async () => {
    return await mockFetchCards()
  }
)

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
