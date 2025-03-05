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
  { id: 'name', label: 'Your Name' ,placeHolder: 'Charlene Reed'},
  { id: 'username', label: 'User Name',placeHolder: 'CharleneReed123' },
  { id: 'email', label: 'Email', type: 'email' ,placeHolder: 'charlenereed@gmail.com'},
  { id: 'password', label: 'Password', type: 'password' ,placeHolder: '**********'},
  { id: 'dateOfBirth', label: 'Date of Birth', type: 'text' ,placeHolder: '3 January 1800'},
  { id: 'presentAddress', label: 'Present Address' ,placeHolder: 'San Jose, California, USA'},
  { id: 'permanentAddress', label: 'Permanent Address' ,placeHolder: 'San Jose, California, USA'},
  { id: 'city', label: 'City' ,placeHolder: 'San Jose'},
  { id: 'postalCode', label: 'Postal Code' ,placeHolder: '45962'},
  { id: 'country', label: 'Country' ,placeHolder: 'USA'},
]

export const formatDate = (timestamp: number | string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
