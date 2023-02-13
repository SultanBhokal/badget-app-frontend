import { useState } from "react"
import { Modal, Form, Button, FormControl } from "react-bootstrap"
import { useStorage } from "../../hooks/store";
import { setNewLimit } from "../../actions/limit";
import { useCategories } from "../../context/CategoryContext";




export default function EditLimitModal() {
    const limit = useStorage((state) => state.limit)
    const limitData = useStorage((state) => state.limitData)
    const [newLmt, setNewLmt] = useState(limit)
    const [month, setMonth] = useState(limitData?.to)
    const currentMonth = limitData?.month
    const showEditTotal = useStorage((state) => state.showEditTotal)
    const setShowEditTotal = useStorage((state) => state.setShowEditTotal)
    const { category } = useCategories()
    const totalUtilized = category.reduce((total, obj) => total + obj.limit, 0)
    const categoryFromDb =useStorage((state)=>state.category)
    const totalUtilizedFromDb = categoryFromDb?.reduce((total,obj)=>total+obj?.limit,0)
    const login = useStorage((state)=>state.login)


   

    function handleSubmit(e) {

        e.preventDefault();
        console.log(newLmt)
        console.log(totalUtilized)
        if (newLmt === "" || newLmt <= 100) {
            return
        }
        if (totalUtilized > newLmt && !login) {
            return
        }
        if(totalUtilizedFromDb > newLmt && login){
            return
        }
        setNewLimit(currentMonth, month, newLmt,"update",limitData?._id)

        setShowEditTotal(false)
    }



    return (
        <Modal show={showEditTotal} onHide={() => setShowEditTotal(false)}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Limit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>
                            Current Limit : {limit}
                        </Form.Label>
                        <Form.Range min={100} max={100000} value={newLmt === "" ? 100 : newLmt} step={100} onChange={e => setNewLmt(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">

                        <FormControl type="Number" placeholder="Please enter valid and real budget limit" value={newLmt} onChange={e => setNewLmt(e.target.value)} />
                    </Form.Group>
                    <p className="w-25  pt-2">From : {currentMonth}</p>
                    <div className="w-75 d-flex">
                        <p className="pt-2 me-2">To</p>
                        <FormControl type="month" min={currentMonth} value={month} onChange={e => setMonth(e.target.value)} />
                    </div>


                    <div className="d-flex justify-content-end">

                        <Button variant="primary" type="submit">Proceed</Button>
                    </div>

                </Modal.Body>

            </Form>

        </Modal>
    )
}
