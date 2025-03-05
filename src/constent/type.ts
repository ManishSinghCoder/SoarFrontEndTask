export interface Dataset {
  label: string
  data: number[]
  backgroundColor: string
  borderRadius: number
  borderSkipped: false
  barPercentage: number
  categoryPercentage: number
  order: number
}

export interface Card {
  id: number
  name: string
  balance: string
  cardNumber: string
  validThrough: string
  variant: string
}

export interface ProfileState {
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
    profilePicture: string
  }
  errors: Record<string, string>
  showDatePicker: boolean
  selectedDate: Date | null
  profileImage: string
}

export interface PieDataset {
  data: number[]
  backgroundColor: string[]
  borderWidth: number
  borderColor: string
  offset: number[]
  hoverOffset: number[]
}

export interface Contacts {
  id: number
  name: string
  title: string
  avatar: string
}

export interface Transaction {
  id: number
  title: string
  date: string
  amount: string
  icon: string
  iconBg: string
  amountColor: string
}
