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
import arrowDownIcon from '../../assets/icons/rightArrow.svg'

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
    <div className={`md:p-8 p-4 md:h-screen rounded-xl bg-[#F5F7FA]`}>
      <div
        className={`md:px-12 md:py-12 p-10 bg-white rounded-3xl ${showDatePicker ? 'backdrop-blur-md pointer-events-none' : 'md:h-screen'}`}
      >
        {showDatePicker && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-auto z-10" />
        )}
        <ProfileIconUpdate setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === TABS.EDIT && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-[50px] md:items-start md:flex-row md:gap-[100px] mt-[60px]"
          >
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
                        {label}
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
                          <img
                            src={arrowDownIcon}
                            className="rotate-90"
                            alt="arroWdownIcon"
                          />
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
              <div className="mt-10 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 w-full md:w-[30%] bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {showDatePicker && (
        <div className="absolute inset-0 flex items-center justify-center top-[35rem] md:top-20 left-0 right-0">
          <DatePicker setShowDatePicker={() => dispatch(closeDatePicker())} />
        </div>
      )}
    </div>
  )
}

export default Setting
