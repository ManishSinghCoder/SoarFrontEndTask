import { useCallback } from 'react'
import { TABS } from '../constants'

const ProfileIconUpdate = ({ setActiveTab, activeTab }: any) => {
  const handleTabChange = useCallback(
    (tab: (typeof TABS)[keyof typeof TABS]) => {
      setActiveTab(tab)
    },
    [setActiveTab]
  )

  return (
    <div className="border-b mb-8">
      <div className="flex">
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            className={`pb-4 sm:px-6 px-2 text-nowrap font-medium text-[16px] font-inter ${
              activeTab === tab
                ? 'border-b-2 border-primary-text-color text-primary-text-color font-bold'
                : 'text-secondary-text-color'
            }`}
            onClick={() =>
              handleTabChange(tab as (typeof TABS)[keyof typeof TABS])
            }
          >
            {tab === TABS.EDIT
              ? 'Edit Profile'
              : tab === TABS.PREFERENCES
                ? 'Preferences'
                : 'Security'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileIconUpdate
