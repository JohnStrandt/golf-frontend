
import React from 'react'; // , {useContext}
// import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { LoginWrapper, Form, InputGroup, SubmitButton } from '../styles/LoginStyles';



const ResetPassword = () => {


  let navigate = useNavigate();

  // let {loginUser} = useContext(AuthContext);

  return (

    <LoginWrapper>

      <Form>
        <button className="close" onClick={() => navigate(-1)} >&times;</button>
        <h2>Reset Password</h2>

        <InputGroup>
          <input type="email" name="email" id="email" required/>
          <label htmlFor="email">Email</label>
        </InputGroup>

        <SubmitButton>submit</SubmitButton>

      </Form>

    </LoginWrapper>

    )
  }

export default ResetPassword;