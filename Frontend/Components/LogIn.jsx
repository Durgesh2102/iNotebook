import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import backgroundImage from './image/notebook.jpg'

const LogIn = () => {

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let emailTest;

    
    const host = "http://localhost:8080"
    const [signData, setSignInData] = useState({ email: "", password: "" })
    const [siginInObjectRegex, setSiginInObjectRegex] = React.useState({
        emailError: false,
        emailHelper: "hello",
    })
    console.log(signData,"data");
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const change = (e) => {
        setSignInData({ ...signData, [e.target.name]: e.target.value })
    }
    const validdateEmail = () => {
        emailTest = emailRegex.test(signData.email)
        if (emailTest) {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                emailError: false,
                emailHelper: "",
            }))
        }

        else {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                emailError: true,
                emailHelper: "Please Enter Correct Email.",
            }))
        }
    }

    const sub = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();


            validdateEmail()
        }
        else {
            validdateEmail()
            if (!setSiginInObjectRegex.emailError) {
                try {
                    const response = await fetch(`${host}/api/auth/SignIn`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: signData.email, password: signData.password }),

                    });
                    let data = await response.json()
                    localStorage.setItem('token', data.token)
                   
                    if (data.sucess) {            //if their is any error in the sucess then it does not redirect it 
                        //save the token and redirect
                        localStorage.setItem('token', data.token)
                        navigate("/")

                    } else {
                        let show = document.getElementById('span')
                        show.innerText = "User Not Found"
                    }
                } catch (error) {
                    console.log("intenal error 403", "403");
                }
            }
        }
        setValidated(true)
    }
    console.log("render");
    return (
        <>

            <div className='d-flex justify-content-center align-items-center' style={{
                height: "100vh", backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

                <Row className=" container d-flex justify-content-end  align-items-center" >
                    <Col md="4 " className=''>

                        <Form noValidate validated={validated} onSubmit={sub} className=' d-flex flex-coloumn rounded justify-content-center align-items-center flex-column py-3 pb-5'  >
                            <h2 className='mb-3 fw-bold'>Login</h2>
                            <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                                <Form.Label>Username</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="email"
                                        aria-describedby="inputGroupPrepend"
                                        name='email'
                                        required
                                        isInvalid={siginInObjectRegex.emailError}
                                        onChange={change}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="10" controlId="validationCustomPassword">
                                <Form.Label>password</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend2"><i className="fa-solid fa-lock"></i></InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        value={signData.password}
                                        name='password'
                                        onChange={change}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        password must be at list 1 alphabet,length 5
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <div className='container ms-3 mt-3'>
                                <span id='span' className='text-danger'></span>
                            </div>

                            <div className='container mt-4 d-flex justify-content-center  align-items-center'>

                                <Button className=' col-md-10' type="submit"  >Login</Button>
                            </div>
                            <div className=' container d-flex flex-row mt-5 ms-3'>
                                <h5>Create account</h5>
                                <p><Link className="link-offset-2 link-underline link-underline-opacity-0 px-2" to="/signup">Signup</Link></p>

                            </div>

                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default LogIn
