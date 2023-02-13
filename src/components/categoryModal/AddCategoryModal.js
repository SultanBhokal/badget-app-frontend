import { useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useCategories } from "../../context/CategoryContext.js";
import { useStorage } from "../../hooks/store.js";
import { UNCATEGORIZED_CATEGORY_ID } from "../../context/CategoryContext.js";
import { addCategoryToDb } from "../../actions/category.js";

export default function AddCategoryModal() {
    const nameRef = useRef()
    const limitRef = useRef()
    const limit = useStorage((state) => state.limit)
    const { addCategory, getCategoryExpenses, category } = useCategories();
    const amount = getCategoryExpenses(UNCATEGORIZED_CATEGORY_ID)?.reduce(
        (total, expense) => total + expense.amount,
        0
    );
    const total = category?.reduce((total, obj) => total + obj?.limit, 0)
    const availableLimit = limit - (total + amount)

    const categoryFromDb = useStorage((state)=>state.category)
    const totalLeftLimitDb = categoryFromDb?.reduce((total,obj)=>total+obj?.limit,0)

    const expensesFromDb = useStorage((state)=>state.expenses)
    const uncatId = categoryFromDb?.find(cat=>cat?.name === "Uncategorized")

    const uncatAmount = expensesFromDb?.filter(exp=>exp?.categoryId === uncatId)?.reduce((total,obj)=>total + obj?.amount,0)
    const totalAmountAvaialableInDb = limit - (totalLeftLimitDb+(uncatAmount?uncatAmount:0))

    

    const showAddCategoryModal = useStorage((state) => state.showAddCategoryModal)
    const setShowAddCategoryModal = useStorage((state) => state.setShowAddCategoryModal)
    const limitData = useStorage((state) => state.limitData)
    const limitId = limitData?._id ? limitData?._id : limitData?.id
    const login = useStorage((state) => state.login)



    function handleSubmit(e) {
        e.preventDefault();
        if (!login) {
            addCategory(
                {
                    name: nameRef.current.value,
                    limit: parseFloat(limitRef.current.value),
                    limitId: limitId
                }
            )
        }
        else {
    
            addCategoryToDb({
                name: nameRef.current.value,
                limit: parseFloat(limitRef.current.value),
                limitId: limitId
            })
        }

        setShowAddCategoryModal(false)
    }

    if(totalAmountAvaialableInDb<=0){
        
        
        return null
    }

    return (
        <Modal show={availableLimit <= 0 ? false : showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="limit">
                        <Form.Label>
                            Limit
                        </Form.Label>
                        {
                            login?
                            <Form.Control ref={limitRef} type="number" required min={0} step={0.01} max={totalAmountAvaialableInDb ? totalAmountAvaialableInDb : limit} placeholder={`Enter Limit less than or equal to ${totalAmountAvaialableInDb ? totalAmountAvaialableInDb : limit}`} />
                            :
                            <Form.Control ref={limitRef} type="number" required min={0} step={0.01} max={availableLimit ? availableLimit : limit} placeholder={`Enter Limit less than or equal to ${availableLimit ? availableLimit : limit}`} />
                            
                        }
                        
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>

                </Modal.Body>

            </Form>

        </Modal>
    )
}
