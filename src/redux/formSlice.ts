import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProfileState } from '../constants/type';
import { IMAGES } from '../constants/icons';

const initialState: ProfileState = {
  formData: {
    name: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    presentAddress: '',
    permanentAddress: '',
    city: '',
    postalCode: '',
    country: '',
    profilePicture: IMAGES.profile,
  },
  errors: {},
  showDatePicker: false,
  selectedDate: null,
  profileImage: IMAGES.profile,
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
      state.formData.dateOfBirth = action.payload.toString()
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
      if (!formData.permanentAddress.trim())
        newErrors.permanentAddress = 'Parmanent Address is required'
      if (!formData.presentAddress.trim())
        newErrors.presentAddress = 'Present Address is required'
      if (!formData.country.trim()) newErrors.country = 'Country is required'
      if (!formData.password.trim()) newErrors.password = 'Password is required'
      if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required'
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
