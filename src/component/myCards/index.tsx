import darkchip from '../../asset/icons/Chip_Card_dark.svg'
import lightchip from '../../asset/icons/Chip_Card.svg'

interface Card {
  id: number
  name: string
  balance: string
  cardNumber: string // Full number, will mask it in UI
  validThrough: string // Expiry date MM/YY
  variant: string
}

interface CardProps {
  cards: Card[]
}
const MyCards: React.FC<CardProps> = ({ cards }) => {
  const maskCardNumber = (number: string) => {
    const parts = number.split(' ')
    if (parts.length !== 4) return number

    return `${parts[0]} **** **** ${parts[3]}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] ">
      {cards.map((card) => (
        <div key={card.id} className={`rounded-2xl  overflow-hidden `}>
          <div
            className={` rounded-tl-2xl rounded-tr-2xl flex flex-col gap-8 p-6 ${
              card.variant === 'dark'
                ? 'bg-[linear-gradient(107.38deg,#5B5A6F_2.61%,#000000_101.2%)] text-white border-none'
                : 'bg-white text-gray-800 border-b-[1px] '
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-md opacity-70">Balance</p>
                <p className="text-2xl font-bold">{card.balance}</p>
              </div>

              <img
                src={`${card.variant === 'dark' ? lightchip : darkchip}`}
                alt="Icon"
                className="w-10 h-10"
              />
            </div>

            <div className="w-[80%] flex justify-between items-start  ">
              <div>
                <p className="text-md opacity-70">CARD HOLDER</p>
                <p className="text-md">{card.name}</p>
              </div>
              <div>
                <p className="text-md opacity-70">VALID THRU</p>
                <p className="text-md">{card.validThrough}</p>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-br-2xl rounded-bl-2xl ${
              card.variant === 'dark' ? 'bg-[#9199AF80]' : 'bg-white'
            }`}
          >
            <p className="text-lg font-medium">
              {maskCardNumber(card.cardNumber)}
            </p>
            <div className="flex -space-x-2">
              <div
                className={`w-6 h-6 rounded-full  ${
                  card.variant === 'dark' ? 'bg-[rgba(255,255,255,0.5)]' : 'bg-[#9199AF80]'
                }`}
              ></div>
              <div
                className={`w-6 h-6 rounded-full ${
                  card.variant === 'dark' ? 'bg-[rgba(255,255,255,0.5)]' : 'bg-[#9199AF80]'
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
