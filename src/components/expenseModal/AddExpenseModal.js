import { useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useCategories, UNCATEGORIZED_CATEGORY_ID } from "../../context/CategoryContext.js";
import { useStorage } from "../../hooks/store.js"
import { addExpanseTodb } from "../../actions/expenses.js";

export default function AddExpenseModal({ defaultCategoryId }) {
    const nameRef = useRef(null)
    const discriptionRef = useRef(null)
    const amountRef = useRef(null)
    const categoryIdRef = useRef(null)
    const dateRef = useRef(null)

    const limitData = useStorage((state) => state.limitData)
    const currentMonth = limitData?.month;
    const toMonth = limitData?.to;
    const d1 = new Date(currentMonth)
    const d2 = new Date(toMonth)
    const fromMonthDate = new Date(d1.getFullYear(), d1.getMonth(), 2);
    const toMonthDate = new Date(d2.getFullYear(), d2.getMonth() + 1, 1);



    const showAddExpenseModal = useStorage((state) => state.showAddExpenseModal)
    const setShowAddExpenseModal = useStorage((state) => state.setShowAddExpenseModal)



    const { addExpense, category } = useCategories()
    const categoryFromDb = useStorage((state) => state.category)
    const login = useStorage((state) => state.login)
    const limitId = limitData?.limitId
  
    function handleSubmit(e) {
        e.preventDefault();
        if (!login) {
            addExpense(
                {
                    name: nameRef.current.value,
                    discription: discriptionRef.current.value,
                    amount: parseFloat(amountRef.current.value),
                    categoryId: categoryIdRef.current.value,
                    date: dateRef.current.value
                }
            )
        }
        else {
            addExpanseTodb({
                name: nameRef.current.value,
                discription: discriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                categoryId: categoryIdRef.current.value,
                date: dateRef.current.value,
                limitId:limitId
            })
        }

        setShowAddExpenseModal(false)
    }




    return (
        <Modal show={showAddExpenseModal} onHide={() => setShowAddExpenseModal(false)}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control ref={nameRef} type="text" required placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="discription">
                        <Form.Label>
                            Discription
                        </Form.Label>
                        <Form.Control ref={discriptionRef} type="text" placeholder="Discription" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>
                            Amount
                        </Form.Label>
                        <Form.Control ref={amountRef} type="number" placeholder="Amount" required min={0} step={0.01} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>
                            Date
                        </Form.Label>
                        <Form.Control type="date" defaultValue={new Date().toISOString().substring(0, 10)} ref={dateRef} min={fromMonthDate.toISOString().substring(0, 10)} max={toMonthDate.toISOString().substring(0, 10)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="categoryId">
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Select
                            defaultValue={defaultCategoryId}
                            ref={categoryIdRef}
                        >

                            {
                                login === false ?
                                    <>
                                        <option id={UNCATEGORIZED_CATEGORY_ID}>Uncategorized</option>
                                        {category.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </> :
                                    <>
                                        {
                                            categoryFromDb?.map(cat => (
                                                <option key={cat?.id?cat?.id:cat?._id} value={cat?.id?cat?.id:cat?._id}>{cat.name}</option>
                                            ))
                                        }
                                    </>
                            }

                        </Form.Select>

                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>

                </Modal.Body>

            </Form>

        </Modal>
    )
}
