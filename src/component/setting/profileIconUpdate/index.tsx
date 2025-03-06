import React, { useCallback, useEffect, useRef } from 'react'

import { updateProfileImage } from '../../../redux/formSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import LazyImage from '../../lazyImage'
import toast from 'react-hot-toast'
import { ICONS } from '../../../constants/icons'

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
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          sessionStorage.setItem('profileImage', base64String)
          dispatch(updateProfileImage(base64String))
        }
        reader.readAsDataURL(file)
        toast.success('Profile picture updated successfully!')
      }
    },
    [dispatch]
  )

  useEffect(() => {
    const storedImage = sessionStorage.getItem('profileImage')
    if (storedImage === profileImage) {
      dispatch(updateProfileImage(storedImage))
    }else{
      sessionStorage.removeItem('profileImage')
    }
  }, [profileImage, dispatch])

  return (
    <div className="relative w-32 h-28">
      <div className="rounded-full overflow-hidden">
        <LazyImage
          src={profileImage}
          alt="Profile"
          imgClassName="w-[200px] h-[15vh] md:h-[12vh] md:w-[150px] object-cover"
        />
        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center"
        >
          <LazyImage src={ICONS.picker} alt="profileImagePickerIcon" />
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
