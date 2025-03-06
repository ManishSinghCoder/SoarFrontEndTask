import { useEffect, useRef, useState } from 'react'

import { Contacts } from '../../constants/type'
import LazyImage from '../lazyImage'
import { ICONS } from '../../constants/icons'

interface IContactsProps {
  contacts: Contacts[]
}

const numberRegex = /^[0-9]*$/

const QuickTransfer: React.FC<IContactsProps> = ({ contacts }) => {
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
              <LazyImage
                src={ICONS.rightArrow}
                imgClassName="rotate-180 w-[7px] h-[13px]"
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
                    <LazyImage
                      src={contact.avatar}
                      alt={contact.name}
                      imgClassName="object-cover w-[80px] h-[80px]"
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
              <LazyImage
                src={ICONS.rightArrow}
                imgClassName="w-[7px] h-[13px]"
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
            pattern="[0-9]*"
            inputMode="numeric"
            value={amount}
            onChange={(e) =>
              setAmount(
                numberRegex.test(e.target.value) ? e.target.value : '500'
              )
            }
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none flex-1 font-inter px-2 md:px-4 text-gray-500 font-medium bg-transparent outline-none w-[70px] md:w-[100px]"
            placeholder="Enter amount"
          />
          <button className="bg-[#232323] shadow-custom-black-card text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2 h-full hover:bg-gray-700">
            <span className="font-medium  text-xs md:text-sm font-inter">
              Send
            </span>
            <LazyImage
              src={ICONS.send}
              imgClassName=" w-[12px] md:w-[26px] h-[22px]"
              alt="sendIcon"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickTransfer
