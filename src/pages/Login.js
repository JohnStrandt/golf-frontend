import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import avatar from "../images/avatar.png";

import {
  LoginWrapper,
  Form,
  InputGroup,
  CardButtons,
  NavButtons,
  SubmitButton
} from "../styles/LoginStyles";



const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const userRef = useRef();


  useEffect(()=> {
    // cursor goes to username right away
    userRef.current.focus();
  },[])



  return (
    <LoginWrapper>

      <LoginForm onSubmit={loginUser}>
        <img src={avatar} alt="avatar" />
        <h2>Login</h2>

        <InputGroup>
          <input type="text" ref={userRef} name="username" autoComplete="off" required />
          <label htmlFor="username">User Name</label>
        </InputGroup>

        <InputGroup>
          <input type="password" name="password" required />
          <label htmlFor="password">Password</label>
        </InputGroup>

        <CardButtons>
          <NavButtons>
            <button
              type="button"
              onClick={() => navigate("/reset")}
              className="nav"
            >
              Reset Password
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="nav"
            >
              Register New Account
            </button>
          </NavButtons>

          <SubmitButton>Login</SubmitButton>

        </CardButtons>
      </LoginForm>
    </LoginWrapper>
  );
};

const LoginForm = styled(Form)`
  padding-top: 80px;
`;

export default LoginPage;
