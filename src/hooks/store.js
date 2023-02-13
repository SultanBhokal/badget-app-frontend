import { create } from "zustand";
import { limit } from "../actions/limit.js";
import { baseUrl } from "../utils.js";
import validator from "validator"
const page = localStorage.getItem("page")





export const useStorage = create((set) => ({
   login: false,
   setLogin: (login) => set({ login }),
   page: page === null ? "dashboard" : page,
   setPage: (page) => set({ page }),
   username: "",
   setUsername: (username) => set({ username }),
   limit: null,
   setLimit: (limit) => set({ limit }),
   limitData: {},
   setLimitData: (limitData) => set({ limitData }),
   showEditTotal: false,
   setShowEditTotal: (showEditTotal) => set({ showEditTotal }),
   showAddCategoryModal: false,
   setShowAddCategoryModal: (showAddCategoryModal) => set({ showAddCategoryModal }),
   showAddExpenseModal: false,
   setShowAddExpenseModal: (showAddExpenseModal) => set({ showAddExpenseModal }),
   addExpenseCategoryId: "Uncategorized",
   setAddExpenseCategoryId: (addExpenseCategoryId) => set({ addExpenseCategoryId }),
   viewExpenseModalByCategory: null,
   setViewExpenseModalByCategory: (viewExpenseModalByCategory) => set({ viewExpenseModalByCategory }),
   expenses: [],
   setExpenses: (expenses) => set({ expenses }),
   category: [],
   setCategory: (category) => set({ category }),
   loading: true,

   setLoading: (loading) => set({ loading }),

   alertShow: false,
   setAlertShow: (alertShow) => set({ alertShow }),
   alertMsg: "",
   setAlertMsg: (alertMsg) => set({ alertMsg }),
   alertType: "",
   setAlertType: (alertType) => set({ alertType }),

   lowLoading: false,
   setLowLoading: (lowLoading) => set({ lowLoading })
}))



fetch(`${baseUrl}/api/user`, {
   credentials: 'include',
   headers: {
      "Content-type": "application/json"
   }
}).then(res => res.json()
)
   .then(res => {

      useStorage.getState().setLogin(res?.isLogin)
      useStorage.getState().setUsername(res?.data?.name)
      limit()
      useStorage.getState().setLoading(false)

   })
   .catch(error => {
      useStorage.getState().setLoading(false)
      useStorage.getState().setAlertMsg("Please try again after sometime or try to refresh server not responding")
      useStorage.getState().setAlertType("danger")
      useStorage.getState().setAlertShow(true)
      limit()


   })





// user actions
export const login = async (email, password) => {

   try {
      useStorage.getState().setLowLoading(true)
      if (!validator.isEmail(email?.toLowerCase())) {
         useStorage.getState().setLowLoading(false)
         useStorage.getState().setAlertMsg("Email is not valid")
         useStorage.getState().setAlertType("danger")
         useStorage.getState().setAlertShow(true)

         return
      }

      const result = await fetch(`${baseUrl}/api/user/login`, {
         method: 'POST',
         credentials: 'include',
         body: JSON.stringify({
            email: email?.toLowerCase(),
            password: password
         }),
         headers: {
            "Content-type": "application/json"
         }
      }
      ).then(res => res.json())


      if (result?.isLogin) {
         useStorage.getState().setLogin(true)
         useStorage.getState().setPage("dashboard")
         useStorage.getState().setUsername(result?.data?.name)
         localStorage.setItem("page", "dashboard")
         useStorage.getState().setLimit(null)
         useStorage.getState().setAlertMsg("Login success")
         useStorage.getState().setAlertType("success")
         useStorage.getState().setAlertShow(true)

         await limit()

      }
      else {
         useStorage.getState().setLowLoading(false)
      }

   } catch (error) {
      console.log("error")
      useStorage.getState().setLowLoading(false)
   }
}

export const logOut = async () => {

   try {
      useStorage.getState().setLowLoading(true)
      const result = await fetch(`${baseUrl}/api/user/logout`, {
         credentials: 'include',
         headers: {
            "Content-type": "application/json"
         }
      }).then(res => res.json())

      if (result?.isLogin === false) {
         localStorage.removeItem("limit")
         localStorage.removeItem("category")
         localStorage.removeItem("expenses")
         useStorage.getState().setLogin(false)
         useStorage.getState().setPage("dashboard")
         useStorage.getState().setUsername("")
         useStorage.getState().setLimit(0)
         useStorage.getState().setLowLoading(false)
         useStorage.getState().setExpenses([])
         useStorage.getState().setCategory([])
         window.location = "/"
      }
      else {
         useStorage.getState().setLowLoading(false)
      }


   } catch (error) {
      console.log("Error")
      useStorage.getState().setLowLoading(false)
   }
}

export const register = async ({ email, password, userName, confirmPassword }) => {


   try {

      if (!validator.isEmail(email?.toLowerCase())) {
         return false
      }

      const result = await fetch(`${baseUrl}/api/user/register`, {
         credentials: 'include',
         method: 'POST',
         body: JSON.stringify({
            email: email?.toLowerCase(),
            password: password,
            confirmPassword: confirmPassword,
            name: userName
         }),
         headers: {

            "Content-type": "application/json"
         }
      }
      ).then(res => res.json())

      if (result?.success) {
         return true
      } else {
         return false
      }

   } catch (error) {
      console.log(error)
   }
}


