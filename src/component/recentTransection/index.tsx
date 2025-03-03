export default function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      title: 'Deposit from my Card',
      date: '28 January 2021',
      amount: '-$850',
      icon: '',
      iconBg: 'bg-yellow-100',
      amountColor: 'text-red-500',
    },
    {
      id: 2,
      title: 'Deposit Paypal',
      date: '25 January 2021',
      amount: '+$2,500',
      icon: '',
      iconBg: 'bg-blue-100',
      amountColor: 'text-green-500',
    },
    {
      id: 3,
      title: 'Jemi Wilson',
      date: '21 January 2021',
      amount: '+$5,400',
      icon: '',
      iconBg: 'bg-cyan-100',
      amountColor: 'text-green-500',
    },
  ]

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm  flex flex-col gap-[30px]">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4">
          <div className={`${transaction.iconBg} p-3 rounded-full`}>
            {transaction.icon}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800">{transaction.title}</p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
          </div>

          <p className={`font-medium ${transaction.amountColor}`}>
            {transaction.amount}
          </p>
        </div>
      ))}
    </div>
  )
}
