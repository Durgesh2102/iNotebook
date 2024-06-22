import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import backgroundImage from './image/notebook.jpg'
const SignUp = () => {
    const nameRegex = /^[A-Za-z]{5,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^[A-Za-z]\w{4,14}$/;
    let nameTest;
    let passwordTest;
    let emailTest;
    let isPasswordCorrect = false;
    const [validated, setValidated] = useState(false);
    const [signInObject, setSignInObject] = React.useState({ name: "", email: "", password: "", rePassword: "" })

    // state varable hold the states , anather is function helps to update the values 
    const [siginInObjectRegex, setSiginInObjectRegex] = React.useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        emailHelper: "hello",
        passwordHelper: "fafvaaf",
        rePasswordErorr: false
    })

    const host = "http://localhost:8080"

    let context = useContext(noteContext)
    const { showAlert } = context;

    let navigate = useNavigate()
    const change = (e) => {
        setSignInObject({ ...signInObject, [e.target.name]: e.target.value })
    }

    // console.log("log the state", signInObject);
    const checkValidation = async () => {

        // function for the check validatation 
        nameTest = nameRegex.test(signInObject.name)
        if (nameTest) {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                nameError: false

            }))
        } else {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                nameError: true
            }))
        }
        emailTest = emailRegex.test(signInObject.email)
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

        passwordTest = passwordRegex.test(signInObject.password)
        if (passwordTest) {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                passwordError: false,
                passwordHelper: "",
            }))
        }

        else {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                passwordError: true,
                passwordHelper: "Please Enter Correct Password.",
            }))
        }
        isPasswordCorrect = (signInObject.password === signInObject.rePassword)

        if (!isPasswordCorrect) {

            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                rePasswordErorr: true,
                passwordHelper: "Please Enter Correct Password.",
            }))

        } else {
            setSiginInObjectRegex((prevState) => ({
                ...prevState,
                rePasswordErorr: false,
                passwordHelper: "Please Enter Correct Password.",
            }))
        }

        if (nameTest && emailTest && passwordTest && isPasswordCorrect) {

            try {
                const response = await fetch(`${host}/api/auth/createUser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: signInObject.name, email: signInObject.email, password: signInObject.password }),

                });
                let data = await response.json()

        
                if (data.sucess) {            //if their is any error in the sucess then it does not redirect it 
                    //save the token and redirect
                    localStorage.setItem('token', data.token)
                    navigate("/")
                    showAlert("SignUp sucessfull", "success");
                } else {
                    showAlert(data.error, data.sucess);
                }
            } catch (error) {
                showAlert("intenal error 403", "403");
            }


        }
    }

    //handle submit 
    const sub = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();


            checkValidation();
        }
        else {
            checkValidation();
        }


    }

    //google 

    return (
        // <div>
        //     <h1>Create an Account to use iNoteBook</h1>
        //     <div className='rounded px-3 mt-5 py-3' style={{ backgroundColor: "white", border: "white" }}>
        //         <form onSubmit={(e) => { e.preventDefault() }}>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputname" className="form-label">Enter Name</label>
        //                 <input type="name" className="form-control" id="name" name='name' aria-describedby="nameHelp" value={signUpData.name} onChange={change} minLength={5} required />
        //                 <div className="valid-feedback">
        //                     Looks good!
        //                 </div>
        //                 <div id="nameHelp" className="form-text"></div>
        //             </div>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
        //                 <input type="email" className="form-control  is-invalid" id="email" name='email' aria-describedby="emailHelp" value={signUpData.email} onChange={change} minLength={5} required emailHelper={siginInObjectRegex.emailHelper} error={siginInObjectRegex.emailError} />

        //                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        //             </div>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
        //                 <input type="password" className="form-control" id="password" name='password' value={signUpData.password} onChange={change} minLength={5} required emailHelper={siginInObjectRegex.passwordHelper} error={siginInObjectRegex.passwordError} />
        //                 <small id="titleHelp" className="form-text text-muted" >{siginInObjectRegex.passwordHelper}</small>
        //             </div>class=
        //             <button disabled={signUpData.name.length < 5 || signUpData.email.length < 5 || signUpData.password.length < 5} type="submit" className="btn btn-primary bg-dark border-dark " onClick={handleSubmit}>SignUp</button>
        //         </form>
        //     </div>
        // </div>
        <div className='d-flex justify-content-center align-items-center' style={{
            height: "100vh", backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }} >
            <Row className=" container d-flex justify-content-end align-items-center"  >
                <Col md="4 " className=''>

                    <Form noValidate validated={validated} onSubmit={sub} className=' d-flex flex-coloumn rounded justify-content-center align-items-center flex-column py-3 pb-5'  >
                        <h2 className='mb-4'>Create Account</h2>
                        <Form.Group as={Col} md="10" controlId="validationCustom01"  >
                            <Form.Label>First name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="inputGroupPrepend" ><i className="fa-solid fa-user"></i></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="name"
                                    placeholder="First name"
                                    name='name'
                                    value={signInObject.name}
                                    isInvalid={siginInObjectRegex.nameError}
                                    onChange={change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Name
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="10" controlId="validationCustomEmail">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend1">@</InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    placeholder="email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name='email'
                                    isInvalid={siginInObjectRegex.emailError}
                                    onChange={change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Pleas enter a valid email.
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
                                    value={signInObject.password}
                                    name='password'
                                    onChange={change}
                                    isInvalid={siginInObjectRegex.passwordError}

                                />
                                <Form.Control.Feedback type="invalid">
                                    password must be at list 1 alphabet,length 5
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="10" controlId="validationCustomPassword">
                            <Form.Label>Confarm Password</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend2"><i className="fa-solid fa-lock"></i></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name='rePassword'
                                    value={signInObject.rePassword}
                                    onChange={change}
                                    isInvalid={siginInObjectRegex.rePasswordErorr}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Enter Correct Password
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <div className='container  d-flex justify-content-center align-items-center  mt-4 mb-3' >
                            <Button className=' col-md-10 ' type="submit" >Sign Up</Button>
                        </div>
                        <div className=' container d-flex flex-row ms-3' >
                            <h5>Alredy account</h5>
                            <p><Link className="link-offset-2 link-underline link-underline-opacity-0 px-2" to="/login">Signin</Link></p>

                        </div>
                    </Form>

                </Col>
            </Row>

        </div>
    )
}

export default SignUp


