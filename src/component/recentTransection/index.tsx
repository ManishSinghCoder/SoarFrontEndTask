import { Transaction } from '../../constent/type'

interface ITransectionProps {
  transactions: Transaction[]
}
const RecentTransactions: React.FC<ITransectionProps> = ({ transactions }) => {
  return (
    <div className="  rounded-3xl  flex flex-col gap-2">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4">
          <div className={`${transaction.iconBg} p-3 rounded-full`}>
            <img
              src={transaction.icon}
              className="w-[28px] h-[28px]"
              alt={transaction.icon}
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-inter font-[500]  ">
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
export default RecentTransactions
