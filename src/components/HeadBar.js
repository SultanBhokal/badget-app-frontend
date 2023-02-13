import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useStorage } from '../hooks/store';
import { logOut } from '../hooks/store';


function HeadBar() {


  const expand = "lg"
  const login = useStorage((state) => state.login)
  const setPage = useStorage((state) => state.setPage)
  const username = useStorage((state) => state.username)

  const setLoginFunction = () => {
    setPage("login")
    localStorage.setItem("page","login")
  }

  return (
    <>

      <Navbar key={expand} bg="dark" variant='dark' expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#" onClick={e => e.preventDefault()}>Budget App</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {login ? username : "Hello"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link onClick={() => login ? logOut() : setLoginFunction()
                }>{login ? "Sign-Out" : "Log-IN"}</Nav.Link>

              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  );
}

export default HeadBar;