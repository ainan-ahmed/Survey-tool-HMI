import React from "react";
import Joi from "joi-browser";
import BaseForm from "./commons/baseForm";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { login } from "../store/users";
import { connect } from "react-redux";
class LoginForm extends BaseForm {
  state = {
    data: { email: "", password: "" },
    errors: {
      email: null,
      password: null,
      non_field_errors: null,
    },
  };
  componentDidUpdate(prevProps) {
    if (this.props.error.msg !== prevProps.error.msg) {
      this.setState({ errors: this.props.error.msg });
    }
  }
  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  submitToServer = async () => {
    const { data } = this.state;
    console.log(data);
    try {
      const response = await this.props.login(data);
      console.log("logged in");
      if(this.props.auth.isAuthenticated)
        this.props.history.push("/")
    } catch (error) {
      console.log("asdfsdaf   -->" + error);
      if (error) {
        console.log("serverError" + error);
        let errors = { ...this.state.errors };
        const serverError = error.response;
        console.log(serverError);
        errors.email = serverError["email"];
        errors.password = serverError["password"];
        this.setState({ errors });
        console.log(this.state.errors);
      }
    }
  };
  render() {
    const { data, errors } = this.state;
    console.log(data,errors);
    return (
      <Container className="mt-5">
        <h1>Login Form</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              autoFocus
              value={data.email}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {errors.email && <Alert variant={"danger"}>{errors.email}</Alert>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            {errors.password && (
              <Alert variant={"danger"}>{errors.password}</Alert>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          {errors.non_field_errors && (
            <Alert variant={"danger"}>{errors.non_field_errors.join()}</Alert>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.errors,
  auth: state.auth
});
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password))

});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
