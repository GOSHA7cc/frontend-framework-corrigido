import { currencyFormatter } from '@/lib/utils'
import CategoryModal from '@/components/modals/CategoryModal';
import { useState } from 'react';

function ExpenseCategoryItem({ expense }) {
    const [categoryModal, setCategoryModal] = useState(false)
    {/* Item de despesa */ }
    return (
        <>
        <CategoryModal show={categoryModal} onClose={setCategoryModal} expense={expense}/>

        <button onClick={() => { setCategoryModal(true) }}>
            <div className='flex items-center justify-between px-4 py-4 bg-white rounded-3xl text-black'>
                <div className='flex items-center gap-2'>
                    <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: expense.color }} />
                    <h4 className='capitalize'>{expense.title}</h4>
                </div>
                <p>{currencyFormatter(expense.total)}</p>
            </div>
        </button>
        </>
    )
}

export default ExpenseCategoryItem;