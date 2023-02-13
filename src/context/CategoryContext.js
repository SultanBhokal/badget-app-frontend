import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";


const CategoryContext = React.createContext()

export const UNCATEGORIZED_CATEGORY_ID = "Uncategorized";

export function useCategories() {
    return useContext(CategoryContext)
}


export const CategoryProvider = ({ children }) => {

    const [category, setCategory] = useLocalStorage("category", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    

    function getCategoryExpenses(categoryId) {
        return expenses.filter(expense => expense.categoryId === categoryId)
    }

    function addExpense({ name, discription, amount, categoryId,date }) {
        setExpenses(prevExpense => {


            return [...prevExpense, {
                id: uuidV4(),
                name,
                discription,
                amount,
                categoryId,
                date
            }]
        })
    }

    function addCategory({ name, limit,date }) {

        setCategory(prevCat => {

            if (prevCat.find(cat => cat.name === name)) {
                return prevCat
            }

            return [...prevCat, {
                id: uuidV4(),
                name,
                limit,
                date
            }]
        })
    }


    function deleteCategory({ id }) {

        setExpenses(exp => exp.filter(e => {
            if (e.categoryId === id) {
                e.categoryId = UNCATEGORIZED_CATEGORY_ID
            }
            return e
        }))

        setCategory(prevCat => {
            return prevCat.filter(cat => cat.id !== id)
        })

    }
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    


    
    
    return (
        <CategoryContext.Provider value={
            {
            expenses,
            category,
            getCategoryExpenses,
            addExpense,
            addCategory,
            deleteCategory,
            deleteExpense
        }}>
            {children}
        </CategoryContext.Provider>
    );
}
