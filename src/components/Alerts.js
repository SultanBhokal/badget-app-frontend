import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useStorage } from '../hooks/store';

function Alerts() {

  const setAlertShow = useStorage((state) => state.setAlertShow)
  const alertShow = useStorage((state)=>state.alertShow)
  const alertType = useStorage((state)=>state.alertType)
  const alertMsg = useStorage((state)=>state.alertMsg)


  return (
    <div style={{
      position: "fixed",
      top: "0",
      left:"10vw",
      right:"10vw",
      margin:"auto",
      backgroundColor:"white",
      zIndex:"100"
    
    }}>
      <Alert show={alertShow} variant={alertType}>
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          {alertMsg}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setAlertShow(false)} variant={`outline-${alertType}`}>
            Close
          </Button>
        </div>
      </Alert>
    </div>
  );
}

export default Alerts;