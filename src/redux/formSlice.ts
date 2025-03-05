import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import profileImageIcon from '../assets/images/profilePicture.svg'

interface ProfileState {
  formData: {
    name: string
    username: string
    email: string
    password: string
    dob: string
    presentAddress: string
    permanentAddress: string
    city: string
    postalCode: string
    country: string
  }
  errors: Record<string, string>
  showDatePicker: boolean
  selectedDate: any
  profileImage: string
}

const initialState: ProfileState = {
  formData: {
    name: 'Charlene Reed',
    username: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    password: '**********',
    dob: '25 January 1990',
    presentAddress: 'San Jose, California, USA',
    permanentAddress: 'San Jose, California, USA',
    city: 'San Jose',
    postalCode: '45962',
    country: 'USA',
  },
  errors: {},
  showDatePicker: false,
  selectedDate: null,
  profileImage: profileImageIcon,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.formData[action.payload.name as keyof ProfileState['formData']] =
        action.payload.value
      delete state.errors[action.payload.name]
    },
    toggleDatePicker: (state) => {
      state.showDatePicker = !state.showDatePicker
    },
    closeDatePicker: (state) => {
      state.showDatePicker = false
    },
    selectDateFromPicker: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload
    },
    validateForm: (state) => {
      const { formData } = state
      const newErrors: Record<string, string> = {}

      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }
      if (!formData.username.trim()) newErrors.username = 'Username is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.postalCode.trim())
        newErrors.postalCode = 'Postal code is required'

      state.errors = newErrors
    },
  },
})

export const {
  updateField,
  toggleDatePicker,
  selectDateFromPicker,
  closeDatePicker,
  validateForm,
  updateProfileImage,
} = profileSlice.actions
export default profileSlice.reducer
