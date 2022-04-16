import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { login } from "../redux/actions/auth";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from './formik';


const SignupForm = () => {
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  // const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  console.log("isLoggedIn: ", isLoggedIn);


  // bezkoder:  redux refresh tutorial
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   form.current.validateAll();
  //   if (checkBtn.current.context._errors.length === 0) {
  //     dispatch(login(username, password))
  //       .then(() => {
  //         props.history.push("/profile");
  //         window.location.reload();
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // };


  if (isLoggedIn) {
    navigate("/")}
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("password"), ""],
              "Passwords do not match"
            )
            .required('Required')

        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            dispatch(login(values.username, values.password))
              .then(() => {

                setSubmitting(false);

              })
              .catch((e) => {
                console.error(e);
              });

          }, 400);

        }}

        // from Formik:
        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        // }}

      >
        <Form>
          <MyTextInput
            label="Username"
            name="username"
            type="text"
            placeholder="username"
          />
          
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
          />


          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@email.com"
          />

          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="password"
          />

          <MyTextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;