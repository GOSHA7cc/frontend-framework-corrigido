import { useRef, useContext } from "react";
import Modal from "@/components/Modal";

import { currencyFormatter, dateFormatter } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { investmentContext } from "@/lib/store/investment-context";

function InvestmentModal({ show, onClose }) {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const { investments, addInvestmentItem, removeInvestmentItem } = useContext(investmentContext);

    const addInvestmentHandler = async (e) => {
        e.preventDefault();

        const newInvestment = {
            amount: +amountRef.current.value,
            description: descriptionRef.current.value,
            createdAt: dateFormatter(new Date()),
        };
        const auth = getAuth();
        const db = getFirestore();

        try {
            await addInvestmentItem(newInvestment);
            descriptionRef.current.value = "";
            amountRef.current.value = "";
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteInvestmentHandler = async (investmentId) => {
        try {
            await removeInvestmentItem(investmentId);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Modal isOpen={show} onClose={onClose}>
            <form onSubmit={addInvestmentHandler} className="flex flex-col gap-4">
                <div className="input-group">
                    <label htmlFor="amount">Quanto pretende investir?</label>
                    <input
                        ref={amountRef}
                        type="number"
                        name="amount"
                        min={0.01}
                        step={0.01}
                        placeholder="Insira o valor"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="description">Descrição</label>
                    <input
                        ref={descriptionRef}
                        name="description"
                        type="text"
                        placeholder="Insira a descrição"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Adicionar Investimento
                </button>
            </form>

            <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-2xl font-bold">Histórico de Investimentos</h3>

                {investments.map((investment) => (
                    <div className="flex justify-between items-center" key={investment.id}>
                        <div>
                            <p className="font-semibold">{investment.description}</p>
                            <small className="text-xs">{investment.createdAt}</small>
                        </div>
                        <p className="flex items-center gap-2">
                            {currencyFormatter(investment.amount)}
                            <button onClick={() => deleteInvestmentHandler(investment.id)}>
                                <FaRegTrashAlt />
                            </button>
                        </p>
                    </div>
                ))}
            </div>
        </Modal>
    );
}

export default InvestmentModal;
