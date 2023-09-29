"use client"
import { createContext, useState, useEffect, useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
// Firebase imports
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const budgetContext = createContext({
    budgets: [],
    addBudgetItem: async () => {},
    removeBudgetItem: async () => {},
});

function BudgetContextProvider({ children }) {
    const [budgets, setBudgets] = useState([]);
    const { user } = useContext(authContext);

    const addBudgetItem = async (newBudget) => {
        const collectionRef = collection(db, "budgets"); // Altere o nome da coleção para "budgets"

        try {
            const docSnap = await addDoc(collectionRef, newBudget);

            // Atualize o estado
            setBudgets([...budgets, { id: docSnap.id, ...newBudget }]);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const removeBudgetItem = async (budgetId) => {
        const docRef = doc(db, "budgets", budgetId); // Altere o nome da coleção para "budgets"

        try {
            await deleteDoc(docRef);
            setBudgets(budgets.filter((budget) => budget.id !== budgetId));
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const values = {
        budgets,
        addBudgetItem,
        removeBudgetItem,
    };

    useEffect(() => {
        if (!user) return;

        // Função para obter dados de orçamento do Firebase Firestore.
        const getBudgetsData = async () => {
            const collectionRef = collection(db, "budgets"); // Altere o nome da coleção para "budgets"
            const docsSnap = await getDocs(collectionRef);

            const data = docsSnap.docs
                .filter((doc) => doc.data().uid === user.uid)
                .map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });

            setBudgets(data);
        };

        getBudgetsData();
    }, [user]);

    return (
        <budgetContext.Provider value={values}>
            {children}
        </budgetContext.Provider>
    );
}

export default BudgetContextProvider;
