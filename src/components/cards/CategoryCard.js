import { Button, Card } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import ProgressBar from "react-bootstrap/ProgressBar";


import { currencyFormat } from "../../utils";
import { useStorage } from "../../hooks/store";

export default function CategoryCard({
  name,
  limit,
  utilized,
  gray,
  hideButtons,
  onViewExpenseClick,
  showMonth,
  availableLimit,
  id
}) {
  const classNames = [];
  const limitData = useStorage((state)=>state.limitData)
  const setShowEditTotal = useStorage((state)=>state.setShowEditTotal)
  const setAddExpenseCategoryId = useStorage((state)=>state.setAddExpenseCategoryId)
  const setShowAddExpenseModal = useStorage((state)=>state.setShowAddExpenseModal)

  if (Number(utilized) > Number(limit)) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  if(availableLimit<=0){
    
    classNames.pop()
    classNames.push("bg-danger", "bg-opacity-10");
    
  }

  

  return (
    <Card className={classNames.join(" ")} style={{ margin: "25px 0" }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormat.format(utilized?utilized:0)}
            {limit && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormat.format(limit)}
              </span>
            )}
          </div>
        </Card.Title>
        {limit && (
          <ProgressBar
            variant={getProgressVariant(utilized, limit)}
            min={0}
            max={limit}
            now={utilized}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={()=>{
                setAddExpenseCategoryId(id)
                setShowAddExpenseModal(true)
              }}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpenseClick}>View Expenses</Button>
          </Stack>
        )}
      </Card.Body>
      {
        showMonth ? (
          <Card.Footer className="d-flex justify-content-between align-items-baseline fw-normal">
           
            <div className="d-flex align-items-baseline">
              
                <span className="text-muted fs-6 ms-1">
                 {limitData?.month === limitData?.to ?limitData?.month :`${limitData?.month} / ${limitData?.to}`}
                </span>
              
            </div>
            <div className="d-flex align-items-baseline">
              
                <Button onClick={()=>setShowEditTotal(true)}>Edit</Button>
              
            </div>
          </Card.Footer>
        ) : ""
      }
       
    </Card>
   

  );
}

function getProgressVariant(utilized, limit) {
  const ratio = utilized / limit;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";

  return "danger";
}
