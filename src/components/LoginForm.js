import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/auth";

import { Formik, Form } from "formik";
import { MyTextInput } from "./formik";
import * as Yup from "yup";

import styled from "styled-components";
import {
  CardButtons,
  NavButtons,
  FormWrapper,
  SubmitButton
} from "../styles/FormStyles";



const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(login(values.username, values.password))
            .then(() => {
              setSubmitting(false);
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      >
        <FormWrapper>
        <CustomForm>
        <h2>Login</h2>
          <Form>
            <MyTextInput
              label="Username"
              name="username"
              type="text"
              placeholder="username"
              autoComplete="off"
            />

            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="off"
            />

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

            <SubmitButton type="submit">Submit</SubmitButton>

          </CardButtons>

          </Form>
        </CustomForm>
    </FormWrapper>
      </Formik>
  );
};

const CustomForm = styled.div`
  position: relative;
  width: 95%;
  max-width: 380px;
  padding: 40px;
  background: rgba(0,0,0,0.7);
  border-radius: 10px;
  color: white;
  box-shadow: 0 15px 25px rgba(0,0,0,0.5);
  img {
    position: absolute;
    top:-50px;
    left: calc(50% - 50px); 
    width: 100px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
  }
  h2 {
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    color: #ff652f;
  }
  .close {
    position: absolute;
    right: 1.5rem;
    top: 0.5rem;
    font-size: 3rem;
    font-weight: 900;
    text-decoration: none;
    color: inherit;
    background: transparent;
    border: none;
    cursor: pointer;
  }

`;


export default LoginForm;
