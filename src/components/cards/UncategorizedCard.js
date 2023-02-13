import CategoryCard from "./CategoryCard";
import {
  useCategories,
  UNCATEGORIZED_CATEGORY_ID,
} from "../../context/CategoryContext";
import { useStorage } from "../../hooks/store";

export default function UncategorizedCard(props) {
  const { getCategoryExpenses ,category} = useCategories();
  const limit = useStorage((state) => state.limit)
  const amount = getCategoryExpenses(UNCATEGORIZED_CATEGORY_ID)?.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const total = category?.reduce((total,obj)=>total+obj?.limit,0)
  const availableLimit = limit - (total+amount)

  const expenses = useStorage((state)=>state.expenses)
  const login = useStorage((state)=>state.login)
  const categoryFromDb = useStorage((state)=>state.category)

  const cat = categoryFromDb?.find(cat=>cat.name === UNCATEGORIZED_CATEGORY_ID)
  const totalOfcategoryLimitFromDb = categoryFromDb?.reduce((total,obj)=>total+obj?.limit,0)
  

  const getAmountArrayFromDb = getCategoryExpensesFromDb()

  const amountFromDb = getAmountArrayFromDb?.reduce(
    (total,exp)=>total+exp?.amount,0
  )




  function getCategoryExpensesFromDb(){
// eslint-disable-next-line
  
      return expenses?.filter(exp=>exp?.categoryId === cat?.id)
    
    
  }


  
  
  if(!login){
    if (amount === 0 || amount === undefined) return null;
    else {
      return (
        <CategoryCard utilized={amount} name="Uncategorized" gray {...props} availableLimit={availableLimit} />
      );
    }
  }

  else{
    if (amountFromDb === 0 || amountFromDb === undefined) return null;
    else {
      return (
        <CategoryCard utilized={amountFromDb} name="Uncategorized" gray {...props} availableLimit={(limit-(totalOfcategoryLimitFromDb+amountFromDb))} />
      );
    }

  }
}
