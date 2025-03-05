import React, { useCallback, useEffect, useRef } from 'react'

import { updateProfileImage } from '../../../redux/formSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import pickerIcon from '../../../assets/icons/pickerIcon.svg'
import LazyImage from '../../lazyImage'


const ProfilePictureUpdate = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const profileImage = useSelector(
    (state: RootState) => state.profile.profileImage
  )

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        dispatch(updateProfileImage(imageUrl))

        return () => URL.revokeObjectURL(imageUrl)
      }
    },
    [dispatch]
  )

  useEffect(() => {
    return () => {
      if (profileImage.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage)
      }
    }
  }, [profileImage])

  return (
    <div className="relative w-32 h-28">
      <div className="rounded-full overflow-hidden">
        <LazyImage
          src={profileImage || '/placeholder.svg'}
          alt="Profile"
          imgClassName="w-[200px] h-full md:h-full md:w-[150px] object-cover"
        />
        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center"
        >
          <LazyImage src={pickerIcon} alt="profileImagePickerIcon" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  )
}

export default ProfilePictureUpdate
