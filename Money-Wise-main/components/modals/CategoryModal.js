import { useContext } from "react";
import { currencyFormatter } from "@/lib/utils";
import { financeContext } from "@/lib/store/finance-context";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "@/components/Modal";

function CategoryModal({ show, onClose, expense }) {

    const { deleteExpenseItem, deleteExpenseCategory } = useContext(financeContext)

    const deleteCategoryHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteExpenseItemHandler = async (item) => {
        try {
            const updatedItems = expense.items.filter((i) => i.id !== item.id)
            
            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total - item.amount
            }
            await deleteExpenseItem(updatedExpense, expense.id);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Modal isOpen={show} onClose={onClose}>
            <div className=" flex items-center justify-between">
                <h2 className="text-3xl">{expense.title}</h2>
                <button onClick={deleteCategoryHandler} className="btn btn-danger">Apagar</button>
            </div>

            <div>
                <h3 className="my-4 text-2xl">Histórico de Despesas</h3>
                {expense.items.map((item) => {
                    return (
                        <div key={item.id} className="flex items-center justify-between">
                            <p>{item.createdAt}</p>
                            <p className="flex items-center gap-2">{currencyFormatter(item.amount)}</p>
                            <button onClick={() => {
                                deleteExpenseItemHandler(item)
                            }}>
                                <FaRegTrashAlt/>
                            </button>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default CategoryModal