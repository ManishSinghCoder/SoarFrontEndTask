import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import CEO from '../assets/images/profile1.svg'
import Director from '../assets/images/profile2.svg'
import Designer from '../assets/images/profile3.svg'
import { Contacts } from '../constent/type'



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
                    avatar: CEO,
                },
                {
                    id: 2,
                    name: 'Randy Press',
                    title: 'Director',
                    avatar: Director,
                },
                {
                    id: 3,
                    name: 'Workman',
                    title: 'Designer',
                    avatar: Designer,
                },
                {
                    id: 4,
                    name: 'Sarah Jones',
                    title: 'Developer',
                    avatar: Director,
                },
                {
                    id: 5,
                    name: 'Mark Twain',
                    title: 'Manager',
                    avatar: Designer,
                },
                {
                    id: 6,
                    name: 'Sarah Jones',
                    title: 'Developer',
                    avatar: Director,
                },
                {
                    id: 7,
                    name: 'Mark Twain',
                    title: 'Manager',
                    avatar: Designer,
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
            .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contacts[]>) => {
                state.contactStatus = 'succeeded'
                state.contacts = action.payload
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.contactStatus = 'failed'
                state.contactsError = action.error.message ?? 'Failed to fetch contacts'
            })
    },
})

export default contactsSlice.reducer
