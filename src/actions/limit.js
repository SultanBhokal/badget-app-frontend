import { useStorage } from "../hooks/store"
import { baseUrl } from "../utils"
import { addUncategorizedToDb, getCategoryFromDB, addCategoriesAndExpensesToDb } from "./category"




export const limit = async () => {
    useStorage.getState().setLowLoading(true)
    const login = useStorage.getState().login
    const setLimit = useStorage.getState().setLimit
    const setLimitData = useStorage.getState().setLimitData
    const d = new Date()
    if (!login) {

        const getLimit = localStorage.getItem("limit")

        if (getLimit !== null) {
            const currentLimit = JSON.parse(getLimit)
            setLimitData(currentLimit)

            const d2 = new Date(currentLimit?.month)
            const d3 = new Date(currentLimit?.to)

            if (d2.getMonth() === d.getMonth() || d3?.getMonth() >= d.getMonth()) {
                setLimit(Number(currentLimit?.limit))
                useStorage.getState().setLowLoading(false)
                return null
            }
            setLimit(0)
            useStorage.getState().setLogin(false)
            useStorage.getState().setLowLoading(false)

            return null
        }
        useStorage.getState().setLowLoading(false)
        useStorage.getState().setLogin(false)
        setLimit(0)
        return null
    }
    else {

        const data = await fetch(`${baseUrl}/api/limit`, {
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())

        if (data?.data?.length === 0) {

            const getLimit = localStorage.getItem("limit")

            if (getLimit !== null) {
                const currentLimit = JSON.parse(getLimit)
                const d2 = new Date(currentLimit?.month)
                const d3 = new Date(currentLimit?.to)

                setNewLimit(currentLimit.month, currentLimit.to, currentLimit.limit)

                localStorage.removeItem("limit")

                if (d2.getMonth() === d.getMonth() || d3?.getMonth() >= d.getMonth()) {
                    setLimit(Number(currentLimit?.limit))
                    setLimitData(currentLimit)
                    useStorage.getState().setLowLoading(false)

                    return null
                }
                useStorage.getState().setLowLoading(false)
                setLimit(0)
                return null
            }
            useStorage.getState().setLowLoading(false)
            setLimit(0)
            return null
        }
        else {

            if (data?.data?.length > 0) {
                const convertData = {
                    ...data?.data[0],
                    month: new Date(data?.data[0]?.month).toISOString().substring(0, 7),
                    to: new Date(data?.data[0]?.to).toISOString().substring(0, 7),
                    limitId: data?.data[0]?._id
                }

                const d2 = new Date(convertData?.month)
                const d3 = new Date(convertData?.to)

                getCategoryFromDB(convertData?._id)

                if (d2.getMonth() === d.getMonth() || d3?.getMonth() >= d.getMonth()) {
                    setLimit(convertData?.limit)
                    setLimitData(convertData)
                    useStorage.getState().setLowLoading(false)
                    return null
                }

                else {
                    const getLimit = localStorage.getItem("limit")

                    if (getLimit !== null) {
                        const currentLimit = JSON.parse(getLimit)
                        const d2 = new Date(currentLimit?.month)
                        const d3 = new Date(currentLimit?.to)

                        localStorage.removeItem("limit")
                        setNewLimit(currentLimit.month, currentLimit.to, currentLimit.limit)


                        if (d2.getMonth() === d.getMonth() || d3?.getMonth() >= d.getMonth()) {
                            setLimit(Number(currentLimit?.limit))
                            setLimitData(currentLimit)
                            useStorage.getState().setLowLoading(false)
                            return null
                        }
                    }

                }

            } else {
                useStorage.getState().setLowLoading(false)

                setLimit(0)
            }

        }
        useStorage.getState().setLowLoading(false)

        return null
    }
}


export const setNewLimit = async (month, till, limit, type, limitId) => {

    const login = useStorage.getState().login
    const setLimit = useStorage.getState().setLimit
    const setLimitData = useStorage.getState().setLimitData
    const newLimit = {
        month: month,
        to: till,
        limit: limit
    }

    if (!login) {
        useStorage.getState().setLowLoading(true)
        localStorage.setItem("limit", JSON.stringify(newLimit))
        setLimitData(newLimit)
        setLimit(Number(newLimit.limit))
        useStorage.getState().setLowLoading(false)

    }
    else {
        if (type === "update") {
            useStorage.getState().setLowLoading(true)
            const updateLimitData = { ...newLimit, limitId: limitId, _id: limitId }


            const data = await fetch(`${baseUrl}/api/limit`, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({ ...updateLimitData }),
                headers: {
                    "Content-type": "application/json",
                }
            }
            ).then(res => res.json())


            if (data?.success === true) {

                setLimitData(updateLimitData)
                setLimit(Number(newLimit.limit))

            }
            useStorage.getState().setLowLoading(false)

        }
        else {
            useStorage.getState().setLowLoading(true)
            const data = await fetch(`${baseUrl}/api/limit`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({ ...newLimit }),
                headers: {
                    "Content-type": "application/json",
                }
            }
            ).then(res => res.json())

            if (data?.success === true) {
                const convertLimit = {
                    _id: data?.data?._id,
                    limitId: data?.data?._id,
                    ...newLimit
                }

                const name = "Uncategorized"
                const limitId = data?.data?._id
                const resultForUncategorized = await addUncategorizedToDb(name, 0, limitId)

                const categoriesFromLocalStorage = localStorage.getItem("category")
                const expensesFromLocalStorage = localStorage.getItem("expenses")



                if (categoriesFromLocalStorage !== null && resultForUncategorized === true) {
                    const parseCategory = await JSON.parse(categoriesFromLocalStorage)
                    const parseExpenses = await JSON.parse(expensesFromLocalStorage)
                    const filterCategory = parseCategory?.map(cat => {
                        return { ...cat, limitId: limitId }
                    })
                    const mapExpenses = parseExpenses?.map(exp => {
                        return { ...exp, limitId: limitId }
                    })

                    const result = await addCategoriesAndExpensesToDb(filterCategory, mapExpenses, limitId)
                    if (result?.success) {

                    }
                    localStorage.removeItem("category")
                    localStorage.removeItem("expenses")

                }


                setLimitData(convertLimit)
                setLimit(Number(newLimit.limit))

                getCategoryFromDB(convertLimit?._id)
                useStorage.getState().setLowLoading(false)
            }
            useStorage.getState().setLowLoading(false)
        }
        localStorage.removeItem("limit")
        localStorage.removeItem("category")
        localStorage.removeItem("expenses")

    }
}

