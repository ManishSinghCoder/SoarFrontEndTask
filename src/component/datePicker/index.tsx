import { useState, useEffect } from 'react'
import { selectDateFromPicker } from '../../redux/formSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import {
  days,
  formatDay,
  isSelected,
  isToday,
  isValidDate,
  months,
} from './constants'

export default function DatePicker({ setShowDatePicker }: any) {
  const currentDate = new Date()
  const [month, setMonth] = useState(currentDate.getMonth())
  const [year, setYear] = useState(currentDate.getFullYear())
  const [calendarDays, setCalendarDays] = useState<
    Array<{ date: Date; currentMonth: boolean }>
  >([])

  const dispatch = useDispatch()
  const selectedDate = useSelector(
    (state: RootState) => state.profile.selectedDate
  )
  const years = Array.from(
    { length: 51 },
    (_, i) => currentDate.getFullYear() - 50 + i
  )

  useEffect(() => {
    const days = []
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const firstDayOfWeek = firstDayOfMonth.getDay()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i)
      days.push({ date, currentMonth: false })
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push({ date, currentMonth: true })
    }

    const lastDayOfWeek = lastDayOfMonth.getDay()
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const date = new Date(year, month + 1, i)
      days.push({ date, currentMonth: false })
    }

    setCalendarDays(days)
  }, [month, year])

  const handleDateSelect = (date: Date) => {
    if (date) {
      if (isValidDate(date)) {
        dispatch(selectDateFromPicker(date))
        setShowDatePicker(false)
      } else {
        console.log('date of birth not in future')
      }
    } else {
      console.log('Please select a date first')
    }
  }

  return (
    <div className="bg-white rounded-3xl p-12 shadow-custom-card border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Select Date</h2>
        <div className="bg-primary-text-color text-white p-2 px-4 rounded-xl flex flex-col items-center">
          <span className="text-xl font-bold">
            {selectedDate
              ? selectedDate?.toLocaleDateString('en-GB', { day: 'numeric' })
              : new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(
                  Date.now()
                )}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(Number.parseInt(e.target.value))}
            className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg text-gray-800 font-medium"
          >
            {months.map((monthName, index) => (
              <option key={monthName} value={index}>
                {monthName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={year}
            onChange={(e) => setYear(Number.parseInt(e.target.value))}
            className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg text-gray-800 font-medium"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center font-medium text-gray-800">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ date, currentMonth }, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              className={`
                h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium
                ${!currentMonth ? 'text-gray-400' : 'text-gray-800'}
                ${isSelected(date, selectedDate) ? 'bg-primary-text-color text-white' : ''}
                ${isToday(date) && !isSelected(date, selectedDate) ? 'text-[#232323]' : ''}
                ${date.getDay() === 0 && currentMonth ? 'text-red-400' : ''}
                ${!isValidDate(date) ? 'text-blue-200 pointer-events-none' : ''}
                hover:bg-primary-text-color hover:text-white transition-colors
              `}
            >
              {formatDay(date)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
