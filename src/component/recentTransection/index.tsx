import paypalIcon from '../../assets/icons/payPalIcon.svg'
import currencyIcon from '../../assets/icons/currencyIcon.svg'
import masterCardIcon from '../../assets/icons/creaditIcon.svg'

export default function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      title: 'Deposit from my Card',
      date: '28 January 2021',
      amount: '-$850',
      icon: masterCardIcon,
      iconBg: 'bg-yellow-100',
      amountColor: 'text-red-500',
    },
    {
      id: 2,
      title: 'Deposit Paypal',
      date: '25 January 2021',
      amount: '+$2,500',
      icon: paypalIcon,
      iconBg: 'bg-blue-100',
      amountColor: 'text-green-500',
    },
    {
      id: 3,
      title: 'Jemi Wilson',
      date: '21 January 2021',
      amount: '+$5,400',
      icon: currencyIcon,
      iconBg: 'bg-cyan-100',
      amountColor: 'text-green-500',
    },
  ]

  return (
    <div className="  rounded-3xl  flex flex-col gap-2">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4">
          <div className={`${transaction.iconBg} p-3 rounded-full`}>
            <img
              src={transaction.icon}
              className="w-[10px] h-[10px]"
              alt={transaction.icon}
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 text-xs  font-inter font-[500]  ">
              {transaction.title}
            </p>
            <p className="text-[15px] text-secondary-text-color font-inter">
              {transaction.date}
            </p>
          </div>

          <p className={`font-inter ${transaction.amountColor}`}>
            {transaction.amount}
          </p>
        </div>
      ))}
    </div>
  )
}
