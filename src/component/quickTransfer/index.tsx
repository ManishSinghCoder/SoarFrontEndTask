import React, { useRef, useState } from 'react'

const QuickTransfer = () => {
  const [amount, setAmount] = useState('500')
  const scrollContainer = useRef<HTMLDivElement>(null)

  const contacts = [
    {
      id: 1,
      name: 'Livia Bator',
      title: 'CEO',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-659eNhQ6pTRmiq03Qt3FvOHFlqz7bI.png',
    },
    {
      id: 2,
      name: 'Randy Press',
      title: 'Director',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-659eNhQ6pTRmiq03Qt3FvOHFlqz7bI.png',
    },
    {
      id: 3,
      name: 'Workman',
      title: 'Designer',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-659eNhQ6pTRmiq03Qt3FvOHFlqz7bI.png',
    },
    {
      id: 4,
      name: 'Sarah Jones',
      title: 'Developer',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-659eNhQ6pTRmiq03Qt3FvOHFlqz7bI.png',
    },
    {
      id: 5,
      name: 'Mark Twain',
      title: 'Manager',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-659eNhQ6pTRmiq03Qt3FvOHFlqz7bI.png',
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
    <div className="bg-white rounded-3xl  p-6 shadow-sm">
      <div>
        <div className="flex items-center justify-evenly gap-3">
          <button
            className="  bg-white  w-10 h-10 rounded-full flex items-center  justify-center p-2 "
            onClick={() => scroll('left')}
          >
            ◀
          </button>

          <div
            ref={scrollContainer}
            className="flex space-x-6 pb-4 scrollbar-hide overflow-x-auto scroll-hide snap-x snap-mandatory no-scrollbar"
            style={{ scrollBehavior: 'smooth', width: '280px' }}
          >
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col items-center min-w-[80px] snap-start"
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
                <p className="font-medium text-gray-800 text-center text-nowrap">
                  {contact.name}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  {contact.title}
                </p>
              </div>
            ))}
          </div>

          <button
            className=" bg-white   w-10 h-10 rounded-full flex items-center  justify-center p-2 "
            onClick={() => scroll('right')}
          >
            ▶
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-nowrap">Write Amount</p>
        <div className="flex items-center  h-12 p-1 bg-gray-100 rounded-full">
          {/* <div className="flex-1 px-4 text-gray-500 font-medium">{amount}</div> */}
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-4 text-gray-500 font-medium bg-transparent outline-none w-[100px]"
            placeholder="Enter amount"
          />
          <button className="bg-black text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2 h-full">
            <span className="font-medium text-sm">Send</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickTransfer
