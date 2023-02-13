import { Button, Card, Form } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import { currencyFormat } from "../../utils";
import { useState } from "react";
import { setNewLimit } from "../../actions/limit";
import { monthNames,monthInNum } from "../../utils";


const d=new Date()
export default function LimitCard() {
  
    const [limit,setLimit] = useState(0)
    const [month,setMonth] = useState(`${d.getFullYear()}-${monthInNum[d.getMonth()]}`)
    const currentMonth = `${d.getFullYear()}-${monthInNum[d.getMonth()]}`
    


  return (
    <Card className={"bg-light"} style={{ margin: "25px 0" }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">PLEASE SET LIMIT</div>
          <div className="d-flex align-items-baseline">
            {currencyFormat.format(limit)}
          </div>
        </Card.Title>
        <Form.Label>Range</Form.Label>
        <Form.Range min={100} max={100000}  value={limit} step={100} onChange={e=>setLimit(e.target.value)}  />
        <Stack direction="horizontal" gap={2} className="mt-4">
            <Form.Control type="number" placeholder="Enter Limit" value={limit} onChange={e=>setLimit(e.target.value)} />
            <Button onClick={()=>limit !== "" && limit >= 100 && setNewLimit(currentMonth,month,limit)}>Proceed</Button>
        </Stack>
        <Stack direction="horizontal" gap={2} className="mt-4">
            <p className="w-25  pt-2">From : {monthNames[d.getMonth()]}</p>
           <div className="w-75 d-flex">
            <p className="pt-2 me-2">To</p>
            <Form.Control type="month" min={month} value={month} onChange={e=>setMonth(e.target.value)} />
            </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}


