import React from "react";
import styled from "@emotion/styled";
import { Formik, Form, ErrorMessage } from "formik";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { withRouter } from "react-router";

import validate from "./validate-yup/validateYup";
import getValidationSchema from "./validate-yup/getValidationSchema";
import GoogleLogo from "../../assets/images/signIn/google.png";
import FacebookLogo from "../../assets/images/signIn/facebook.png";

const FormTitle = styled.h1`
  color: #fff;
  margin-bottom: 24px;
`;

const FormInput = styled.input`
  width: 349px;
  height: 57px;
  border-radius: 10px;
  border: 1px solid transparent;
  padding-left: 28px;
  margin-bottom: 24px;

  ::placeholder {
    font-weight: bold;
    color: #ec453b;
  }

  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  width: 349px;
  height: 53px;
  background: linear-gradient(90deg, #2c3e50 29.37%, #4c9aaf 100%);
  box-shadow: 0px 4px 10px rgba(76, 161, 175, 0.5);
  border-radius: 10px;
  color: #fff;
  border: none;
`;

const InsideRightContent = styled.div`
  /* padding-left: 110px; */
  height: 450px;
  margin-top: 135px;
`;

const WidthForm = styled.div`
  width: 350px;
  margin: 0 auto;
`;

const OrSignInWith = styled.div`
  color: #fff;
  text-align: center;
  margin: 24px 0;
  font-size: 20px;
  font-weight: bold;
`;

const SignWith = styled.div`
  height: 50px;
  background: #fff;
  border-radius: 10px;
  padding: 10px 15px;

  span {
    font-weight: bold;
    font-size: 18px;
    margin-left: 10px;
  }
`;

class SignInForm extends React.Component {
  render() {
    return (
      <InsideRightContent>
        <WidthForm>
          <FormTitle>SIGN IN</FormTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validate(getValidationSchema)}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(
                  `http://ec2-18-218-96-166.us-east-2.compute.amazonaws.com/users/signin`,
                  {
                    email: values.email,
                    password: values.password
                  }
                )
                .then(response => {
                  console.log(response);
                  setSubmitting(false);
                  this.props.history.push("/logged-in");
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            {({ isSubmitting, handleChange, values, setSubmitting }) => (
              <Form>
                <FormInput
                  type="email"
                  autoComplete="current-email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                />
                <ErrorMessage name="email" component="span" />

                <FormInput
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
                <ErrorMessage name="password" component="span" />

                <FormButton
                  type="submit"
                  disabled={values.password.length > 0 ? false : true}
                >
                  {isSubmitting ? "Loading" : "Sign In"}
                </FormButton>
              </Form>
            )}
          </Formik>
          <OrSignInWith>Or sign in with</OrSignInWith>
          <Row>
            <Col>
              <SignWith>
                <img src={GoogleLogo} alt="google" width="35px" />
                <span> Google</span>
              </SignWith>
            </Col>
            <Col>
              <SignWith>
                <img src={FacebookLogo} alt="facebook" width="35px" />
                <span>Facebook</span>
              </SignWith>
              <div>Don't have an account yet, sign up here</div>
            </Col>
          </Row>
        </WidthForm>
      </InsideRightContent>
    );
  }
}

export default withRouter(SignInForm);
