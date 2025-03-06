import { toggleDatePicker } from '../../../redux/formSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'

import LazyImage from '../../lazyImage'
import { formatDate } from '../constants'

import React from 'react'
import { ICONS } from '../../../constants/icons'

interface IFormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeHolder: string
  selectedDate: number | string | null
}
const numberRegex = /^[0-9]*$/

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeHolder,
  selectedDate,
}: IFormFieldProps) {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[16px] font-medium text-default-text-color mb-1 font-inter"
      >
        {label} *
      </label>
      {id !== 'dateOfBirth' ? (
        <input
          type={type}
          id={id}
          name={id}
          inputMode={id === 'postalCode' ? 'numeric' : 'text'}
          value={
            id === 'postalCode'
              ? numberRegex.test(value)
                ? value
                : '0'
              : value
          }
          placeholder={placeHolder}
          onChange={onChange}
          className={`appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full h-[50px] px-4 py-2 shadow-custom-card border border-primary-border-color focus:border-[1px] ${value.length > 0 ? 'text-primary-text-color' : 'placeholder-secondary-text-color'} rounded-[15px] ${
            error ? 'border-red-500' : 'border-primary-border-color '
          }`}
        />
      ) : (
        <div className="relative">
          <input
            type="text"
            id="dob"
            name="dob"
            value={
              selectedDate !== null ? formatDate(selectedDate) : placeHolder
            }
            placeholder={placeHolder}
            onKeyDown={() => dispatch(toggleDatePicker())}
            readOnly
            onClick={() => dispatch(toggleDatePicker())}
            className={`w-full h-[50px] shadow-custom-card ${selectedDate !== null ? 'text-primary-text-color' : 'text-secondary-text-color'} px-4 py-2 border border-primary-border-color rounded-[15px] focus:ring-2 focus:ring-blue-500 cursor-pointer`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <LazyImage
              src={ICONS.rightArrow}
              imgClassName="rotate-90"
              alt="arroWdownIcon"
            />
          </div>
        </div>
      )}
      {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
    </div>
  )
}
export default React.memo(FormField)
