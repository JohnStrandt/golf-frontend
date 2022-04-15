import React, {useContext, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import { LoginWrapper, Form, InputGroup, CardButtons, NavButtons, SubmitButton } from '../styles/LoginStyles';



const RegisterPage = () => {

  let navigate = useNavigate();
  let {registerUser} = useContext(AuthContext);

  const firstNameRef = useRef();


  useEffect(()=> {
    firstNameRef.current.focus();
  },[])


  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (

    <LoginWrapper>

      <Form onSubmit={registerUser} >

        <h2>Register</h2>

        <InputGroup>
          <input type="text" name="first_name" ref={firstNameRef} autoComplete="off" required/>
          <label htmlFor="first_name">First Name</label>
        </InputGroup>

        <InputGroup>
          <input type="text" name="last_name" autoComplete="off" required/>
          <label htmlFor="last_name">Last Name</label>
        </InputGroup>

        <InputGroup>
          <input type="text" name="username" autoComplete="off" required/>
          <label htmlFor="username">Username</label>
        </InputGroup>

        <InputGroup>
          <input type="email" name="email" autoComplete="off" required/>
          <label htmlFor="email">Email</label>
        </InputGroup>

        <InputGroup>
          <input type="password" name="password" required/>
          <label htmlFor="password">Password</label>
        </InputGroup>

        <InputGroup>
          <input type="password" name="password_confirm" onKeyUp={onEnter} required/>
          <label htmlFor="password_confirm">Confirm Password</label>
        </InputGroup>

        <CardButtons>
          <NavButtons>
            <button type="button" onClick={() => navigate('/login')} >Login</button>
          </NavButtons>

          <SubmitButton>Register</SubmitButton>
        </CardButtons>

      </Form>

    </LoginWrapper>

  )
}


export default RegisterPage;