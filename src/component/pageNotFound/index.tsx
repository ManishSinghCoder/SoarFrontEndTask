import { Link } from 'react-router-dom'

import searchIcon from '../../assets/icons/searchIcon.svg'
import rightArrow from '../../assets/icons/rightArrow.svg'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center max-h-screen h-[89vh] justify-center bg-[#F5F7FA] p-4 md:p-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 flex items-center justify-center rounded-full border-8 border-gray-100">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold text-gray-500">
                <img
                  className="h-12 w-12 text-gray-300"
                  src={searchIcon}
                  alt="search icon"
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="mb-2 font-inter text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          404 Page Not Found
        </h1>

        <p className="mb-8 font-inter text-gray-500">
          We couldn't find the page you're looking for. It might have been
          comming soon...
        </p>

        <div className="flex flex-col justify-center md:flex-row  gap-6  ">
          <button className="border-gray-200 border-[1px] px-6 py-4 rounded-xl bg-white hover:bg-gray-100">
            <Link to="/dashboard" className="flex items-center justify-center gap-2">
              <img
                className="h-4 w-4 font-inter text-gray-300 rotate-180"
                src={rightArrow}
                alt="search icon"
              />
              Back to dashboard
            </Link>
          </button>

          <button className="bg-gray-900 font-inter border-[1px] px-6 py-4 rounded-xl text-white hover:bg-gray-800">
            <Link to="/setting">Contact support</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
