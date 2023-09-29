"use client"
import { createContext, useState, useEffect, useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
// Firebase imports
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const investmentContext = createContext({
    investments: [],
    addInvestmentItem: async () => {},
    removeInvestmentItem: async () => {},
});

function InvestmentContextProvider({ children }) {
    const [investments, setInvestments] = useState([]);
    const { user } = useContext(authContext);

    const addInvestmentItem = async (newInvestment) => {
        const collectionRef = collection(db, "investments");

        try {
            const docSnap = await addDoc(collectionRef, newInvestment);

            // Update state
            setInvestments([...investments, { id: docSnap.id, ...newInvestment }]);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const removeInvestmentItem = async (investmentId) => {
        const docRef = doc(db, "investments", investmentId);

        try {
            await deleteDoc(docRef);
            setInvestments(investments.filter((i) => i.id !== investmentId));
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const values = {
        investments,
        addInvestmentItem,
        removeInvestmentItem,
    };

    useEffect(() => {
        if (!user) return;

        // Function to get investment data from Firebase Firestore.
        const getInvestmentsData = async () => {
            const collectionRef = collection(db, "investments");
            const docsSnap = await getDocs(collectionRef);

            const data = docsSnap.docs
                .filter((doc) => doc.data().uid === user.uid)
                .map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });

            setInvestments(data);
        };

        getInvestmentsData();
    }, [user]);

    return (
        <investmentContext.Provider value={values}>
            {children}
        </investmentContext.Provider>
    );
}

export default InvestmentContextProvider;
