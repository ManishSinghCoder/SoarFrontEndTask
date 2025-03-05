export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const isToday = (date: Date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const isSelected = (date: Date, selectedDate: Date | null) => {
  if (!selectedDate) return false
  return (
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear()
  )
}

export const formatDay = (date: Date) => {
  return date.getDate().toString().padStart(2, '0')
}

export const isValidDate = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date <= today
}
