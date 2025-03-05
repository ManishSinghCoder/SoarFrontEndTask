import React, { useEffect, useRef, useState } from 'react'
import rightArrow from '../../assets/icons/rightArrow.svg'
import CEO from '../../assets/images/profile1.svg'
import Director from '../../assets/images/profile2.svg'
import Designer from '../../assets/images/profile3.svg'
import sendIcon from '../../assets/icons/sendIcon.svg'

const QuickTransfer = () => {
  const [amount, setAmount] = useState('500')
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [isClicked, setIsClicked] = useState<number | null>()

  useEffect(() => {
    const updateScrollButtons = () => {
      if (!scrollContainer.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current
      setShowLeft(scrollLeft > 0)
      setShowRight(scrollLeft < scrollWidth - clientWidth)
    }

    const container = scrollContainer.current
    container?.addEventListener('scroll', updateScrollButtons)

    updateScrollButtons()

    return () => container?.removeEventListener('scroll', updateScrollButtons)
  }, [])

  const contacts = [
    {
      id: 1,
      name: 'Livia Bator',
      title: 'CEO',
      avatar: CEO,
    },
    {
      id: 2,
      name: 'Randy Press',
      title: 'Director',
      avatar: Director,
    },
    {
      id: 3,
      name: 'Workman',
      title: 'Designer',
      avatar: Designer,
    },
    {
      id: 4,
      name: 'Sarah Jones',
      title: 'Developer',
      avatar: Director,
    },
    {
      id: 5,
      name: 'Mark Twain',
      title: 'Manager',
      avatar: Designer,
    },
    {
      id: 6,
      name: 'Sarah Jones',
      title: 'Developer',
      avatar: Director,
    },
    {
      id: 7,
      name: 'Mark Twain',
      title: 'Manager',
      avatar: Designer,
    },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 100
      scrollContainer.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className=" bg-transparent  md:bg-white rounded-3xl h-[17rem] py-12 px-6 md:shadow-custom-card">
      <div>
        <div className="flex items-center justify-evenly gap-[30px]">
          {showLeft && (
            <button
              className="bg-white  w-10 h-10 rounded-full flex items-center  justify-center p-2 shadow-custom-card"
              onClick={() => scroll('left')}
            >
              <img
                src={rightArrow}
                className="rotate-180 w-[7px] h-[13px]"
                alt="leftArrow"
              />
            </button>
          )}

          <div
            ref={scrollContainer}
            className="flex space-x-6 pb-4 scrollbar-hide overflow-x-auto scroll-hide snap-x snap-mandatory no-scrollbar"
            style={{ scrollBehavior: 'smooth', width: '300px' }}
          >
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setIsClicked(contact.id)}
                className={`flex flex-col items-center min-w-[80px] snap-start ${isClicked === contact.id && 'font-bold leading-[20px]'} hover:font-bold hover:leading-[20px] hover:text-md cursor-pointer`}
              >
                <div className="relative w-20 h-20 mb-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="font-inter text-primary-text-color text-center text-nowrap">
                  {contact.name}
                </p>
                <p className="text-sm font-inter text-secondary-text-color text-center">
                  {contact.title}
                </p>
              </div>
            ))}
          </div>

          {showRight && (
            <button
              className=" bg-white w-10 h-10 rounded-full flex items-center  justify-center p-2 shadow-custom-card"
              onClick={() => scroll('right')}
            >
              <img
                src={rightArrow}
                className="w-[7px] h-[13px]"
                alt="rightArrow"
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-nowrap text-sm md:text-md font-inter font-[400] text-secondary-text-color">
          Write Amount
        </p>
        <div className="flex items-center  h-10 md:h-12 p-1 bg-[#EDF1F7] rounded-full">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 font-inter px-2 md:px-4 text-gray-500 font-medium bg-transparent outline-none w-[70px] md:w-[100px]"
            placeholder="Enter amount"
          />
          <button className="bg-[#232323] shadow-custom-black-card text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2 h-full hover:bg-gray-700">
            <span className="font-medium  text-xs md:text-sm font-inter">Send</span>
            <img src={sendIcon} className=" w-[12px] md:w-[26px] h-[22px]" alt="sendIcon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickTransfer
