import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Card } from '../constent/type'

interface CardState {
  cards: Card[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  number: number
}

const initialState: CardState = {
  cards: [],
  status: 'idle',
  error: null,
  number: 2,
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
          validThrough: '08/26',
          variant: 'light',
        },
        {
          id: 3,
          name: 'Jane carter',
          balance: '$8,200',
          cardNumber: '9376 5432 1098 6658',
          validThrough: '05/28',
          variant: 'dark',
        },
        {
          id: 4,
          name: 'stave Smith',
          balance: '$10,200',
          cardNumber: '3876 5432 1098 2659',
          validThrough: '10/21',
          variant: 'light',
        },
        {
          id: 5,
          name: 'Jack sparrow',
          balance: '$20,200',
          cardNumber: '2876 5432 1098 9854',
          validThrough: '13/24',
          variant: 'dark',
        },
        {
          id: 6,
          name: 'Jack doe',
          balance: '$25,200',
          cardNumber: '3896 5432 1098 8655',
          validThrough: '12/23',
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
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload
    },
  },
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
export const { setNumber } = cardSlice.actions
export default cardSlice.reducer
