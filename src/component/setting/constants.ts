export type FormData = {
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

export type FormErrors = Partial<Record<keyof FormData, string>>

export const TABS = {
  EDIT: 'edit',
  PREFERENCES: 'preferences',
  SECURITY: 'security',
} as const

export const fields = [
  { id: 'name', label: 'Your Name' },
  { id: 'username', label: 'User Name' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'password', label: 'Password', type: 'password' },
  { id: 'dateOfBirth', label: 'Date Of Birth', type: 'text' },
  { id: 'presentAddress', label: 'Present Address' },
  { id: 'permanentAddress', label: 'Permanent Address' },
  { id: 'city', label: 'City' },
  { id: 'postalCode', label: 'Postal Code' },
  { id: 'country', label: 'Country' },
]

export const formatDate = (timestamp: number | string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
