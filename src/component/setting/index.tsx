import type React from 'react'
import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormField from './formComponent'
import ProfileIconUpdate from './settingTabs'
import ProfilePictureUpdate from './profileIconUpdate'
import { fields, formatDate, TABS } from './constants'
import DatePicker from '../datePicker'
import { AppDispatch, RootState } from '../../redux/store'
import {
  closeDatePicker,
  toggleDatePicker,
  updateField,
  validateForm,
} from '../../redux/formSlice'

function Setting() {
  const dispatch = useDispatch<AppDispatch>()
  const { formData, errors, showDatePicker, selectedDate } = useSelector(
    (state: RootState) => (state as any).profile
  )
  const [activeTab, setActiveTab] = useState<(typeof TABS)[keyof typeof TABS]>(
    TABS.EDIT
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      dispatch(updateField({ name, value }))
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      dispatch(validateForm())

      if (Object.keys(errors).length === 0) {
        console.log('Profile updated successfully!')
      }
    },
    [dispatch, errors]
  )

  useEffect(() => {
    if (!showDatePicker) return
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const datePickerElement = document.getElementById('dob-container')
      if (datePickerElement && !datePickerElement.contains(target)) {
        dispatch(closeDatePicker())
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch, showDatePicker])

  return (
    <div
      className={`p-8 h-[89vh] rounded-xl ${showDatePicker ? 'bg-[#F5F7FA]' : 'bg-[#F5F7FA]'}`}
    >
      <div
        className={`px-12 py-12 bg-white rounded-3xl ${showDatePicker ? 'backdrop-blur-md pointer-events-none' : 'h-[80vh]'}`}
      >
        <ProfileIconUpdate setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === TABS.EDIT && (
          <form onSubmit={handleSubmit} className="flex gap-[100px] mt-[60px]">
            <ProfilePictureUpdate />
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(({ id, label, type = 'text' }) =>
                  id === 'dateOfBirth' ? (
                    <div key={id}>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="dob"
                          name="dob"
                          value={formatDate(selectedDate) || formData.dob}
                          readOnly
                          onClick={() => dispatch(toggleDatePicker())}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <FormField
                      key={id}
                      id={id}
                      label={label}
                      type={type}
                      value={formData[id]}
                      onChange={handleInputChange}
                      error={errors[id]}
                    />
                  )
                )}
              </div>
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {showDatePicker && (
        <div className="absolute inset-0 flex items-center justify-center top-20 left-0 right-0">
          <DatePicker setShowDatePicker={() => dispatch(closeDatePicker())} />
        </div>
      )}
    </div>
  )
}

export default Setting
