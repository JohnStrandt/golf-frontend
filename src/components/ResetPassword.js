
import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { LoginWrapper, CustomForm, InputGroup, SubmitButton } from '../styles/FormStyles';


const ResetPassword = () => {

  let navigate = useNavigate();

  return (

    <LoginWrapper>

      <CustomForm>
        <button className="close" onClick={() => navigate(-1)} >&times;</button>
        <h2>Reset Password</h2>

        <InputGroup>
          <input type="email" name="email" id="email" required/>
          <label htmlFor="email">Email</label>
        </InputGroup>

        <SubmitButton>submit</SubmitButton>

      </CustomForm>

    </LoginWrapper>

    )
  }

export default ResetPassword;