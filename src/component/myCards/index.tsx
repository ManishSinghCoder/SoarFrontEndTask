import darkchip from '../../assets/icons/Chip_Card_dark.svg'
import lightchip from '../../assets/icons/Chip_Card.svg'
import { Card } from '../../constent/type'
import LazyImage from '../lazyImage'

interface ICardProps {
  cards: Card[]
  number: number
}
const MyCards: React.FC<ICardProps> = ({ cards, number }) => {
  const maskCardNumber = (number: string) => {
    const parts = number.split(' ')
    if (parts.length !== 4) return number
    return `${parts[0]} **** **** ${parts[3]}`
  }

  return (
    <div className="flex gap-[30px]  min-w-max pr-5 ">
      {cards.slice(0, number).map((card) => (
        <div
          key={card.id}
          className={` w-[320px]  md:w-[350px] lg:w-[400px] ${number === 2 ? '2xl:w-full' : '2xl:w-[400px]'} rounded-2xl shadow-custom-card ${card.variant === 'dark' && 'custom-black-card bg-[linear-gradient(107.38deg,#5B5A6F_2.61%,#000000_101.2%)]'} overflow-hidden `}
        >
          <div
            className={` rounded-tl-2xl rounded-tr-2xl flex flex-col gap-8 p-5  ${
              card.variant === 'dark'
                ? 'text-white border-none'
                : 'bg-white text-gray-800 border-b-[1px] '
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-md opacity-70 font-lato font-[400]">
                  Balance
                </p>
                <p className="text-2xl font-lato font-[600]">{card.balance}</p>
              </div>

              <LazyImage
                src={`${card.variant === 'dark' ? lightchip : darkchip}`}
                alt="Icon"
                imgClassName="w-10 h-10"
              />
            </div>

            <div className=" w-[80%]  flex justify-between items-start  ">
              <div>
                <p className="text-md opacity-70  font-lato font-[400] text-nowrap">
                  CARD HOLDER
                </p>
                <p className="text-md  font-lato font-[600] text-nowrap">
                  {card.name}
                </p>
              </div>
              <div>
                <p className="text-md opacity-70  font-lato font-[400] text-nowrap">
                  VALID THRU
                </p>
                <p className="text-md  font-lato font-[600]">
                  {card.validThrough}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-br-2xl rounded-bl-2xl ${
              card.variant === 'dark' ? 'bg-card-gradient' : 'bg-white'
            }`}
          >
            <p
              className={`text-lg  font-lato font-[600] ${card.variant === 'dark' ? 'text-white' : 'text-primary-text-color'}`}
            >
              {maskCardNumber(card.cardNumber)}
            </p>
            <div className="flex -space-x-3">
              <div
                className={`w-6 h-6 rounded-full  ${
                  card.variant === 'dark'
                    ? 'bg-[rgba(255,255,255,0.5)]'
                    : 'bg-[#9199AF80]'
                }`}
              ></div>
              <div
                className={`w-6 h-6 rounded-full ${
                  card.variant === 'dark'
                    ? 'bg-[rgba(255,255,255,0.5)]'
                    : 'bg-[#9199AF80]'
                }`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyCards
