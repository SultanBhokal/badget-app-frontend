import { baseUrl } from "../utils"
import { useStorage } from "../hooks/store"
import { getExpansesFromDb } from "./expenses"

export const getCategoryFromDB = async (limitId) => {
    try {
        useStorage.getState().setLowLoading(true)
        const setCategory = useStorage.getState().setCategory
       

        const result = await fetch(`${baseUrl}/api/category?` + new URLSearchParams({
            limitId:limitId
        }),{
            credentials: 'include',
            headers:{
                "Content-type": "application/json"
            }
        }
        ).then(res=>res.json())

        if (result?.success) {
            const convertCategory = result?.data?.map((cat)=>{
                if(cat?.name === "Uncategorized"){
                    return {...cat,catId:"Uncategorized",id:cat?._id}
                } 
                return {...cat,id:cat?._id}
            })
            setCategory(convertCategory)
            useStorage.getState().setLowLoading(false)
            getExpansesFromDb()
        }
        else{

            useStorage.getState().setLowLoading(false)
        }


    } catch (error) {
        console.log(error)
        useStorage.getState().setLowLoading(false)
        return null
    }
}


export const addCategoryToDb = async ({ name, limit, limitId }) => {

    try {
        useStorage.getState().setLowLoading(true)
        const category = useStorage.getState().category
        const setCategory = useStorage.getState().setCategory
        const result = await fetch(`${baseUrl}/api/category`,{
            credentials: 'include',
            method:'POST',
            body:JSON.stringify({
                name:name,limit:limit,limitId:limitId
            }),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())

        if (result?.success) {
        
           
           const finalCats = [...category,{...result?.data}]
           const mapedCategory =  finalCats?.map(cat=>{
            return {...cat,id:cat?._id}
           })
           useStorage.getState().setLowLoading(false)
           setCategory(mapedCategory)
            
        }
        else{
            useStorage.getState().setLowLoading(false)
        }

    } catch (error) {
        console.log(error)
        useStorage.getState().setLowLoading(false)
    }
}

export const addUncategorizedToDb = async ( name, limit, limitId ) => {
    try {
        
        const setCategory = useStorage.getState().setCategory
        const category = useStorage.getState().category
       

        const result = await fetch(`${baseUrl}/api/category`,{
            credentials: 'include',
            method:'POST',
            body:JSON.stringify({
                name:name,limit:limit,limitId:limitId
            }),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())

       

        if (result?.success) {
            
            setCategory([
                ...category,{
                    ...result?.data,catId:"Uncategorized"
                }
            ])
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        useStorage.getState().setLowLoading(false)
        return false
    }



}


export const deleteCategoryFromDb = async (id)=>{
    try {
        useStorage.getState().setLowLoading(true)
        const category = useStorage.getState().category
        const setCategory = useStorage.getState().setCategory
        const expenses = useStorage.getState().expenses
        const setExpenses = useStorage.getState().setExpenses
       
        const result= await fetch(`${baseUrl}/api/category?`+new URLSearchParams({
            categoryId:id
        }),{
            credentials: 'include',
            method:'DELETE',
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())

        if(result?.success){
            const filteredCategory = category?.filter(cat=>cat?.id !== id)
            const uncat= category?.find(cat=>cat?.name === "Uncategorized")
            const uncatId = uncat?._id
            
            const filteredExpeneses = await expenses?.map(exp=>{
                if(exp?.categoryId === id){
                    
                    return {...exp,categoryId:uncatId}
                }
                return exp
            })

           
            useStorage.getState().setLowLoading(false)
            setExpenses(filteredExpeneses)
            setCategory(filteredCategory)

        }
        else{
            useStorage.getState().setLowLoading(false)
        }
    } catch (error) {
        console.log(error)
        useStorage.getState().setLowLoading(false)
    }
}



export const addCategoriesAndExpensesToDb = async (categoriesFromLocalStorage,expensesFromLocalStorage,limitId)=>{
    try {
        useStorage.getState().setLowLoading(true)
        const result = await fetch(`${baseUrl}/api/category/local`,{
            credentials: 'include',
            method:'POST',
            body:JSON.stringify({
                category:categoriesFromLocalStorage,
                expenses:expensesFromLocalStorage,
                limitId:limitId
            }),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())

       if(result?.success){
        useStorage.getState().setLowLoading(false)
        return true
       }
       useStorage.getState().setLowLoading(false)

    } catch (error) {
        console.log(error)
    }
}