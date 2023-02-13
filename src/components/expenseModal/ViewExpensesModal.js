import { Modal, Button, Stack } from "react-bootstrap";
import {
  useCategories,
  UNCATEGORIZED_CATEGORY_ID,
} from "../../context/CategoryContext.js";
import { currencyFormat } from "../../utils.js";
import { useStorage } from "../../hooks/store.js";
import { deleteExpenseFromDb } from "../../actions/expenses.js";
import { deleteCategoryFromDb } from "../../actions/category.js";

export default function ViewExpensesModal({ categoryId, handleClose }) {



  const { getCategoryExpenses, category, deleteCategory, deleteExpense } =
    useCategories();

  const expenses = getCategoryExpenses(categoryId);

  const cat =
    UNCATEGORIZED_CATEGORY_ID === categoryId
      ? { name: "Uncategorized", id: UNCATEGORIZED_CATEGORY_ID }
      : category.find((c) => c.id === categoryId);

  const login = useStorage((state) => state.login)

  const expensesFromDb = useStorage((state) => state.expenses)
  const categoryFromDb = useStorage((state) => state.category)

  const filteredExp = getExpensesFilteredOnId()

  function getExpensesFilteredOnId() {
    return expensesFromDb?.filter(exp => {
      if (exp?.categoryId === categoryId) return exp
      return null
    })
  }


  const catName = categoryFromDb?.find((c) => c?.id === categoryId)

  return (
    <Modal show={categoryId != null} onHide={handleClose} size="xl">

      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {catName?.name}</div>
            {
              login ?
                <>
                  {catName?.name !== "Uncategorized" && (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        deleteCategoryFromDb(catName?.id);
                        handleClose();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </>
                :
                <>
                  {categoryId !== UNCATEGORIZED_CATEGORY_ID && (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        deleteCategory(cat);
                        handleClose();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </>
            }

          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="verticle" gap={3}>

          {expenses?.map(expense => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div style={{
                width: "100%"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "auto",
                  fontSize: "0.8rem",
                  columnGap: "15px"
                }}>
                  <p style={{
                    flex: "1",
                  }}>{expense?.name}</p>
                  <p style={{
                    flex: "1",
                  }}>{expense?.discription}</p>
                  <p style={{
                    flex: "1",
                  }}>{new Date(expense?.date)?.toISOString().substring(0, 7)}</p>
                  <p style={{
                    flex: "1",
                  }}>{currencyFormat.format(expense.amount)}</p>
                  <Button size="sm" variant="outline-danger" style={{ height: "30px", width: "40px" }} onClick={() => deleteExpense(expense)}>&times;</Button>
                </div>
              </div>


            </Stack>
          ))}
          {login &&
            filteredExp?.map(expense => (
              <div style={{
                width: "100%"
              }}>
                <div key={expense?.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "auto",
                  fontSize: "0.8rem",
                  columnGap: "15px"
                }}>
                  <p style={{
                    flex: "1"
                  }}>{expense?.name}</p>
                  <p style={{
                    flex: "1"
                  }}>{expense?.discription}</p>
                  <p style={{
                    flex: "1"
                  }}
                  >{new Date(expense?.date).toDateString().substring(0, 7)}</p>
                  <p style={{
                    flex: "1"
                  }}>{currencyFormat.format(expense.amount)}</p>
                  
                    <Button size="sm" style={{
                      width: "40px",
                      height: "30px"
                    }} variant="outline-danger" onClick={() => deleteExpenseFromDb(expense?.id)}>&times;</Button>


                  

                </div>
              </div>


            ))}

        </Stack>
      </Modal.Body>

    </Modal>
  );
}
