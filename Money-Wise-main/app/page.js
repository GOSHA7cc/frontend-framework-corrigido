"use client";
import { useState, useContext, useEffect } from 'react';
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from '@/lib/store/auth-context';
import { budgetContext } from '@/lib/store/budget-context';
import { currencyFormatter, dateFormatter } from '@/lib/utils';
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import IncomeModal from '@/components/modals/IncomeModal';
import ExpenseModal from "@/components/modals/ExpenseModal";
import InvestmentModal from "@/components/modals/InvestmentModal";
import BudgetModal from '@/components/modals/BudgetModal';
import SignIn from '@/components/SignIn';




// Charts
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home() {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [investmentModal, setInvestmentModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
 
  const [balance, setBalance] = useState(0)
  const { expenses, income } = useContext(financeContext)
  const { user, loading } = useContext(authContext)
  const { budgets } = useContext(budgetContext)
  

  

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total
      }, 0)
    setBalance(newBalance)
  }, [expenses, income])

  if (loading) {
    return (
      <div className="spinner-container flex justify-center items-center h-screen">
        <div className="loading-spinner">
        </div>
      </div>
    )
  }
  if (!user) {
    return <SignIn />
  }

  return (
    <>
      {/* Modals */}
      <IncomeModal show={incomeModal} onClose={setIncomeModal} />
      <ExpenseModal show={expenseModal} onClose={setExpenseModal} />
      <InvestmentModal show={investmentModal} onClose={setInvestmentModal} />
      <BudgetModal show={budgetModal} onClose={setBudgetModal} />

      {/* Body of Application */}
      <main className="container max-w-2xl px-4 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">Saldo</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        {/* Income and Expense Buttons */}
        <section className="flex items-center gap-2 py-3">
          <button onClick={() => { setIncomeModal(true) }} className="btn btn-primary-outline">Entrada</button>
          <button onClick={() => { setExpenseModal(true) }} className="btn btn-primary">Saída</button>
          <button onClick={() => { setBudgetModal(true) }} className="btn btn-primary">Orçamento</button>
          <button onClick={() => { setInvestmentModal(true) }} className="btn btn-primary">investimentos</button>
        </section>

        {/* Expenses */}
        <section className='py-6'>
          <h3 className='text-3xl'>Meus Gastos</h3>

          {/* Expenses Item */}
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map(expense => {
              return (
                <ExpenseCategoryItem
                  key={expense.id}
                  expense={expense}
                />
              )
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className='py-6'>
          <a id='stats'></a>
          <h3 className='text-3xl'>Estatisticas</h3>
          <div className='w-3/4
           mx-auto'>
            <Doughnut data={{
              labels: expenses.map(expense => expense.title),
              datasets: [
                {
                  label: "Gastos",
                  data: expenses.map(expense => expense.total),
                  backgroundColor: expenses.map(expense => expense.color),
                  borderColor: ['#18181b'],
                  borderWidth: 5,
                }]
            }} />
          </div>
        </section>
        
      </main>
    </>
  )
}
