import { useCategories } from "../../context/CategoryContext";
import { useStorage } from "../../hooks/store";
import CategoryCard from "./CategoryCard";

export default function TotalBudgetCard(props) {

    const { expenses } = useCategories()
    const limit = useStorage((state) => state.limit)
    const login = useStorage((state)=>state.login)
   

  

    const amount = expenses?.reduce((total, expense) => total + expense.amount, 0)

    const expensesFromDb = useStorage((state)=>state.expenses)

    const amountOfExpenseFromDb = expensesFromDb?.reduce((total,obj)=>total+obj?.amount,0)

    


    if(login){

        return (
            <CategoryCard limit={limit} utilized={amountOfExpenseFromDb} name="Total" gray {...props} showMonth={true}/>
        );

    }
    else{
        return (
            <CategoryCard limit={limit} utilized={amount} name="Total" gray {...props} showMonth={true}/>
        );
    }

   

}
