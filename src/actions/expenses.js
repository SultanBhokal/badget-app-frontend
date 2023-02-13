import { useStorage } from "../hooks/store"
import { baseUrl } from "../utils"



export async function getExpansesFromDb() {
    try {
        useStorage.getState().setLowLoading(true)
        const limitId = useStorage.getState().limitData?._id
       
       
        const result = await fetch(`${baseUrl}/api/expenses?`+new URLSearchParams({
            limitId:limitId
        }),{
            credentials: 'include',
            headers:{
                "Content-type": "application/json"
            }
        }
        ).then(res=>res.json())
        if (result?.success) {
           

            const expansesMap = result?.data
            const expenses = await expansesMap?.map((exp)=>{
                return {...exp,id:exp?._id}
            })

        

            
            useStorage.getState().setLowLoading(false)
            useStorage.getState().setExpenses(expenses)
        }
        useStorage.getState().setLowLoading(false)
    } catch (error) {

    }
}


export async function addExpanseTodb({ name, discription, amount, categoryId, date, limitId }) {
    const setExpenses =useStorage.getState().setExpenses
    const expenses = useStorage.getState().expenses
    
    try {
        useStorage.getState().setLowLoading(true)
        const result = await fetch(`${baseUrl}/api/expenses`, {
            credentials: 'include',
            method:'POST',
            body:JSON.stringify({
                name,discription,amount,date,categoryId,limitId
            }),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())
        
        if (result?.success) {
            let updatedExpanse = expenses
            updatedExpanse?.push(result?.data)
            const finalExpenses = await updatedExpanse?.map(exp=>{
                return {...exp,id:exp?._id}
            })
            useStorage.getState().setLowLoading(false)
            setExpenses([...finalExpenses])
        }
        else{
            useStorage.getState().setLowLoading(false)
        }
    } catch (error) {
        console.log(error)
        useStorage.getState().setLowLoading(false)

    }
}


export const deleteExpenseFromDb = async(id)=>{
    useStorage.getState().setLowLoading(true)
    const setExpenses = useStorage.getState().setExpenses
    const expenses = useStorage.getState().expenses
    try {
       
        const result = await fetch(`${baseUrl}/api/expenses?`+new URLSearchParams({
            expenseId:id
        }),{
            credentials: 'include',
            method:'DELETE',
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())

        if(result?.success){
            const filterExpenses = await expenses?.filter(exp=>{
                if(exp.id!== id)return exp
                return null
            })
            useStorage.getState().setLowLoading(false)
            
            setExpenses(filterExpenses)
        }else{
            useStorage.getState().setLowLoading(false)
        }
        
    } catch (error) {
        useStorage.getState().setLowLoading(false)
    }
}

