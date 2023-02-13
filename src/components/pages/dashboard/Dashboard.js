import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import CategoryCard from "../../cards/CategoryCard";
import AddCategoryModal from "../../categoryModal/AddCategoryModal";
import AddExpenseModal from "../../expenseModal/AddExpenseModal";
import {
  UNCATEGORIZED_CATEGORY_ID,
  useCategories,
} from "../../../context/CategoryContext";
import UncategorizedCard from "../../cards/UncategorizedCard";
import TotalBudgetCard from "../../cards/TotalBudgetCard";
import ViewExpensesModal from "../../expenseModal/ViewExpensesModal";
import "./dashboard.css";
import { useStorage } from "../../../hooks/store";
import LimitCard from "../../cards/Limit";
import EditLimitModal from "../../limitModal/EditLimitModal.js";
import Loader from "../../Loader";
import { motion } from "framer-motion"


function Dashboard() {
  const limit = useStorage((state) => state.limit)

  const setShowAddCategoryModal = useStorage((state) => state.setShowAddCategoryModal)

  const setShowAddExpenseModal = useStorage((state) => state.setShowAddExpenseModal)

  const addExpenseCategoryId = useStorage((state) => state.addExpenseCategoryId)

  const setAddExpenseCategoryId = useStorage((state) => state.setAddExpenseCategoryId)

  const viewExpenseModalByCategory = useStorage((state) => state.viewExpenseModalByCategory)
  const setViewExpenseModalByCategory = useStorage((state) => state.setViewExpenseModalByCategory)

  const { category, getCategoryExpenses } = useCategories();


  const login = useStorage((state) => state.login)

  const categoryFromDb = useStorage((state) => state.category)
  const expenses = useStorage((state) => state.expenses)



  function getCategoryExpensesFromDb(categoryId) {

    return expenses?.filter(exp => exp?.categoryId === categoryId)
  }


  if (limit === null) return <Loader />

  return (

    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >



      {
        limit !== 0 ?
          (
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
              <Container className="my-4">

                <Stack direction="horizontal" gap={2} className="mb-4">
                  <h4 className="me-auto">Expense Tracker</h4>
                  <Button
                    variant="primary"
                    onClick={() => setShowAddCategoryModal(true)}
                  >
                    Add Category
                  </Button>
                  <Button variant="outline-primary" onClick={() => {
                    setAddExpenseCategoryId("")
                    setShowAddExpenseModal(true)
                  }}>
                    Add Expense
                  </Button>
                </Stack>
                <div className="category-cards">
                  {
                    !login ?
                      <>
                        {category?.map((cat) => {
                          const utilizedAmount = getCategoryExpenses(cat.id ? cat.id : cat._id)?.reduce(
                            (total, expenses) => total + expenses.amount,
                            0
                          );
                          return (
                            <CategoryCard
                              key={cat.id ? cat.id : cat?._id}
                              name={cat.name}
                              limit={cat.limit}
                              utilized={utilizedAmount ? utilizedAmount : 0}
                              id={cat.id ? cat.id : cat?._id}
                              onViewExpenseClick={() => setViewExpenseModalByCategory(cat.id ? cat.id : cat?._id)}
                            />
                          );
                        })}
                      </>
                      :
                      <>
                        {
                          categoryFromDb?.map((cat) => {
                            if (cat?.catId === "Uncategorized") return ""
                            const catExp = getCategoryExpensesFromDb(cat.id)

                            const utilizedAmount = catExp?.reduce((total, exp) => total + exp?.amount, 0)


                            return (
                              <CategoryCard
                                key={cat?.id}
                                name={cat.name}
                                limit={cat.limit}
                                utilized={utilizedAmount ? utilizedAmount : 0}
                                id={cat?.id}
                                onViewExpenseClick={() => setViewExpenseModalByCategory(cat?.id)}
                              />
                            );
                          })}
                      </>
                  }

                  <UncategorizedCard
                    id=""
                    onViewExpenseClick={() => {
                      const uncatId = categoryFromDb?.find(cat => cat?.catId === UNCATEGORIZED_CATEGORY_ID)
                      const categoryId = uncatId?.id
                      setViewExpenseModalByCategory(categoryId ? categoryId : UNCATEGORIZED_CATEGORY_ID)
                    }
                    }
                  />

                  <TotalBudgetCard hideButtons />
                </div>
              </Container>
              <AddCategoryModal />

              <AddExpenseModal

                defaultCategoryId={addExpenseCategoryId}

              />

              <ViewExpensesModal
                categoryId={viewExpenseModalByCategory}
                handleClose={() => setViewExpenseModalByCategory()}
              />

              <EditLimitModal />
            </motion.div>
          )
          :

          (
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
              <Container className="my-4">

                <Stack direction="horizontal" gap={2} className="mb-4">
                  <h4 className="me-auto">Expense Tracker</h4>

                </Stack>
                <div className="category-cards">
                  <LimitCard />

                </div>
              </Container>
            </motion.div>
          )
      }



    </motion.div>
  );
}

export default Dashboard;
