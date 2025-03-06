import type React from 'react'
import { useEffect, useCallback, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { fields, formatDate, TABS } from './constants'
import DatePicker from '../datePicker'
import {
  closeDatePicker,
  updateField,
  validateForm,
} from '../../redux/formSlice'
import toast from 'react-hot-toast'
import LoadingScreen from '../loadingScreen'

const FormField = lazy(() => import('./formComponent'))
const ProfileIconUpdate = lazy(() => import('./settingTabs'))
const ProfilePictureUpdate = lazy(() => import('./profileIconUpdate'))

function Setting() {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const { formData, errors, showDatePicker, selectedDate, profileImage } =
    useSelector((state: RootState) => (state as any).profile)
  const [activeTab, setActiveTab] = useState<string>(TABS.EDIT)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      dispatch(updateField({ name, value }))
      dispatch(validateForm())
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      dispatch(validateForm())
      if (fields.filter((item) => formData[item.id] === '').length === 0) {
        if (Object.values(errors).length === 0) {
          dispatch(updateField({ name: 'profilePicture', value: profileImage }))
          dispatch(
            updateField({ name: 'dob', value: formatDate(selectedDate) })
          )
          toast.success('Profile updated successfully!')
          setLoading(false)
        } else {
          toast.error('Please fill all the * fields')
          setLoading(false)
        }
      } else {
        toast.error('Please fill all the * fields')
        setLoading(false)
      }
    },
    [dispatch, errors, formData, profileImage, selectedDate]
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
        className={`md:pb-4 p-10 bg-white rounded-3xl ${showDatePicker ? 'backdrop-blur-md pointer-events-none' : 'md:h-auto'}`}
      >
        {showDatePicker && (
          <div className="absolute md:h-[calc(100vh-140px)] rounded-2xl inset-0 bg-white/10 backdrop-blur-sm pointer-events-auto z-10" />
        )}
        <Suspense fallback={<LoadingScreen isError={false} />}>
          <ProfileIconUpdate
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </Suspense>
        {activeTab === TABS.EDIT && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-[50px] md:items-start md:flex-row md:gap-[100px] mt-[30px]"
          >
            <Suspense fallback={<LoadingScreen isError={false} />}>
              <ProfilePictureUpdate />
            </Suspense>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fields.map(({ id, label, placeHolder }) => (
                  <Suspense
                    key={id}
                    fallback={<LoadingScreen isError={false} />}
                  >
                    <FormField
                      key={id}
                      id={id}
                      label={label}
                      type='text'
                      value={formData[id]}
                      onChange={handleInputChange}
                      error={errors[id]}
                      placeHolder={placeHolder}
                      selectedDate={selectedDate}
                    />
                  </Suspense>
                ))}
              </div>
              <div className="mt-10 flex justify-center md:justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 w-full md:w-[30%] bg-default-text-color text-white font-medium rounded-[15px]  focus:ring-2 focus:ring-gray-500 hover:bg-gray-600"
                >
                  {loading ? 'Loading...' : 'Save'}
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
