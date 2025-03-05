interface ILoadingScreen {
  isError: boolean
}
const LoadingScreen: React.FC<ILoadingScreen> = ({ isError }) => {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen h-[89vh] bg-[#F5F7FA]">
      {!isError && (
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full rounded-full border-4 border-white-100"></div>
          <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-blue-700 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-full bg-blue-100 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-blue-600"></div>
        </div>
      )}
      <div className="mt-8 text-gray-500 text-lg font-inter">
        {isError ? 'Opps' : 'Loading...'}
      </div>
      <div className="mt-2 text-gray-400 text-sm font-inter">
        {isError ? 'Getting Error' : 'Please wait a moment'}{' '}
      </div>
    </div>
  )
}

export default LoadingScreen
