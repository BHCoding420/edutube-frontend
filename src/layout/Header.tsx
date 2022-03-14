import React,{useState,useEffect} from 'react';
import {Navbar,Container,Nav,Form,FormControl,Button,Dropdown,DropdownButton} from 'react-bootstrap';
import AddTutorial from './AddTutorial/AddTutorial';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentUser,log_out } from '../services/getCurrentUser';
import "./Header.css";
import {useNavigate} from "react-router-dom";


const Header = () => {

    const [User, setUser] = useState<any>(null);
    const [isOpen, setisOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    function closeModal() {
        setisOpen(false);
    }

    useEffect(() => {

    console.log(getCurrentUser());
    setUser(getCurrentUser());



    }, [])


  return (

    <Navbar  bg="light" expand="lg">
        <Container fluid className="d-flex justify-content-between">



            <h3 onClick={() => navigate("/")}  >Edutube</h3>


            <Form className="d-flex " style={{width: '50%'}}  >
                <input type="text" className="form-control" id="inputPassword" placeholder="Search for videos (  It does not work yet :(  )"  />

                <Button variant="outline-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </Button>
            </Form>


            {!User ? (<Nav >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse  id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href={`${process.env.REACT_APP_HOME}/register`}>SignUp</Nav.Link>
                        <Nav.Link href={`${process.env.REACT_APP_HOME}/login`}>Log in</Nav.Link>
                    </Nav>


                </Navbar.Collapse>
            </Nav>):(
                <Nav className="d-flex justify-content-between" >
                    <div className="dropdown">
                        <img src={User.pic ? User.pic : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} alt="Avatar" className="avatar"/>
                        <div className="dropdown-content">
                            <p onClick={() => navigate(`/profile/${User.id}`)}>Profile</p>
                            <p onClick={() => log_out()}>Log out</p>
                        </div>
                    </div>
                    <Button className="mx-3" variant="light" onClick={() => setisOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Button>


                    <AddTutorial isOpen={isOpen} closeModal={closeModal} />
                </Nav>

            )}





        </Container>
    </Navbar>
  )
}

export default Header