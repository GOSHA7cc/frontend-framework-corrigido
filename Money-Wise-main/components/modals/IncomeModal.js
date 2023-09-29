import { useRef, useEffect, useContext } from "react"
import { currencyFormatter, dateFormatter } from "@/lib/utils";
import Modal from "@/components/Modal";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";
//Icons
import { FaRegTrashAlt } from "react-icons/fa";

function IncomeModal({ show, onClose }) {
    const amountRef = useRef()
    const descriptionRef = useRef()
    const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext)

    const { user } = useContext(authContext)

    const addIncomeHandler = async (e) => {
        e.preventDefault()

        const newIncome = {
            amount: +amountRef.current.value,
            description: descriptionRef.current.value,
            createdAt: dateFormatter(new Date()),
            uid: user.uid
        };
        try {
            await addIncomeItem(newIncome)
            descriptionRef.current.value = ""
            amountRef.current.value = ""
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteIncomeEntryHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Modal isOpen={show} onClose={onClose}>
            <form onSubmit={addIncomeHandler} className='flex flex-col gap-4'>
                <div className='input-group'>
                    <label htmlFor='amount'>Quanto deseja adiconar?</label>
                    <input
                        ref={amountRef}
                        type='number'
                        name='amount'
                        min={0.01}
                        step={0.01}
                        placeholder='Insira o valor'
                        required
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor='description'>Descrição</label>
                    <input
                        ref={descriptionRef}
                        name='description'
                        type='text'
                        placeholder='Insira a descrição'
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Adicionar Saldo</button>
            </form>

            <div className='flex flex-col gap-4 mt-6'>
                <h3 className='text-2xl font-bold'>Histórico de Entradas</h3>

                {income.map((i) => {
                    return (
                        <div className='flex justify-between items-center' key={i.id}>
                            <div>
                                <p className='font-semibold'>{i.description}</p>
                                <small className='text-xs'>{i.createdAt}</small>
                            </div>
                            <p className='flex items-center gap-2'>
                                {currencyFormatter(i.amount)}
                                <button onClick={() => { deleteIncomeEntryHandler(i.id) }}>
                                    <FaRegTrashAlt />
                                </button>
                            </p>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}
export default IncomeModal