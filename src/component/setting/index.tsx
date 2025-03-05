import type React from 'react'
import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import FormField from './formComponent'
import ProfileIconUpdate from './settingTabs'
import ProfilePictureUpdate from './profileIconUpdate'
import { fields, formatDate, TABS } from './constants'
import DatePicker from '../datePicker'
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
  const [activeTab, setActiveTab] = useState<string>(
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
    <div className={`md:p-8 md:pb-0 p-4 md:h-[calc(100vh-140px)] rounded-xl`}>
      <div
        className={`md:pb-0 p-10 bg-white rounded-3xl ${showDatePicker ? 'backdrop-blur-md pointer-events-none' : 'md:h-[calc(100vh-140px)]'}`}
      >
        {showDatePicker && (
          <div className="absolute md:h-[calc(100vh-140px)] rounded-2xl inset-0 bg-white/10 backdrop-blur-sm pointer-events-auto z-10" />
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
                {fields.map(({ id, label, type = 'text', placeHolder }) =>
                  id === 'dateOfBirth' ? (
                    <div key={id}>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-default-text-color mb-1"
                      >
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="dob"
                          name="dob"
                          value={
                            selectedDate !== null
                              ? formatDate(selectedDate)
                              : placeHolder
                          }
                          placeholder={placeHolder}
                          readOnly
                          onClick={() => dispatch(toggleDatePicker())}
                          className={`w-full h-[50px] shadow-custom-card ${selectedDate !== null ? 'text-primary-text-color' : 'text-secondary-text-color'} px-4 py-2 border border-primary-border-color rounded-[15px] focus:ring-2 focus:ring-blue-500 cursor-pointer`}
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
                      placeHolder={placeHolder}
                    />
                  )
                )}
              </div>
              <div className="mt-10 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 w-full md:w-[30%] bg-default-text-color text-white font-medium rounded-[15px]  focus:ring-2 focus:ring-gray-500 hover:bg-gray-200"
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
