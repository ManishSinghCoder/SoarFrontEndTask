import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Contacts } from '../constants/type'
import { IMAGES } from '../constants/icons'

interface ContactState {
  contacts: Contacts[]
  contactStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  contactsError: string | null
}

const initialState: ContactState = {
  contacts: [],
  contactStatus: 'idle',
  contactsError: null,
}

const mockFetchCards = (): Promise<Contacts[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Livia Bator',
          title: 'CEO',
          avatar: IMAGES.ceo,
        },
        {
          id: 2,
          name: 'Randy Press',
          title: 'Director',
          avatar: IMAGES.director,
        },
        {
          id: 3,
          name: 'Workman',
          title: 'Designer',
          avatar: IMAGES.designer,
        },
        {
          id: 4,
          name: 'Sarah Jones',
          title: 'Developer',
          avatar: IMAGES.director,
        },
        {
          id: 5,
          name: 'Mark Twain',
          title: 'Manager',
          avatar: IMAGES.designer,
        },
        {
          id: 6,
          name: 'Sarah Jones',
          title: 'Developer',
          avatar: IMAGES.ceo,
        },
        {
          id: 7,
          name: 'Mark Twain',
          title: 'Manager',
          avatar: IMAGES.director,
        },
      ])
    }, 1500)
  })
}

export const fetchContacts = createAsyncThunk<Contacts[]>(
  'contacts/fetchContacts',
  async () => {
    return await mockFetchCards()
  }
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contactStatus = 'loading'
        state.contactsError = null
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contacts[]>) => {
          state.contactStatus = 'succeeded'
          state.contacts = action.payload
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contactStatus = 'failed'
        state.contactsError = action.error.message ?? 'Failed to fetch contacts'
      })
  },
})

export default contactsSlice.reducer
