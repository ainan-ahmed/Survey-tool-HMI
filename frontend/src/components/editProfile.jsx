import React from "react";
import BaseForm from "./commons/baseForm";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { updateUser } from "../store/users";
import { toast } from 'react-toastify';
class EditProfile extends BaseForm {
  state = {
    data: {
      email: this.props.auth.user.email,
      username: this.props.auth.user.username,
      date_of_birth: this.props.auth.user.date_of_birth,
      first_name: this.props.auth.user.first_name,
      last_name: this.props.auth.user.last_name,
      // password: this.props.auth.user.password,
      // password2: this.props.auth.user.password2,
      gender: this.props.auth.user.gender,
      bio: this.props.auth.user.bio,
      city: this.props.auth.user.city,
    },
    errors: {
      email:"",
      username:"",
      date_of_birth:"",
      first_name:"",
      last_name:"" ,
      // password:"" ,
      // password2:"",
      gender:"",
      bio:"",
      city: "",
    },
  };
  schema = {
    email: Joi.string().required().email().label("Email"),
    username: Joi.string().required().label("Username"),
    first_name: Joi.string().required().label("First name"),
    last_name: Joi.string().required().label("Last name"),
    date_of_birth: Joi.string().required().label("Date of birth"),
    gender: Joi.string().required().label("Gender"),
    bio: Joi.string().label("Bio"),
    city: Joi.string().label("City"),
    // password: Joi.string().required().min(6).label("Password"),
    // password2: Joi.string()
    //   .required()
    //   .min(6)
    //   .valid(Joi.ref("password"))
    //   .options({ language: { any: { allowOnly: "password do not match" } } })
    //   .label("Password"),
  };

  submitToServer = async () => {
    //call the server
    console.log(this.state.data);
    // const {
    //   email,
    //   first_name,
    //   last_name,
    //   //password,
    //   // password2,
    //   date_of_birth,
    //   gender,
    //   username,
    //   bio,
    //   city,
    // } = this.state.data;
    const data = JSON.stringify(this.state.data);
    try {
      await this.props.updateUser(data);
      toast.success("User updated successfully.")
      //localStorage.setItem("token", token["key"]);
      //window.location = "/";
      // this.props.history.push("/");
    } catch (error) {
      let errors = { ...this.state.errors };
      console.log(error);
      console.log(errors);
      const serverError = error.response.data;
      errors.email = serverError["email"];
      errors.username = serverError["username"];
      errors.bio = serverError["city"];
      errors.city = serverError["city"];
      errors.first_name = serverError["first_name"];
      errors.last_name = serverError["last_name"];
      errors.date_of_birth = serverError["date_of_birth"];
      // errors.password = serverError["password"];
      // errors.password2 = serverError["password2"];
      this.setState({ errors });
      console.log(this.state.errors);
    }
    //console.log("submitted");
  };
  render() {
    //console.log(this.props);
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <Container className="mt-5">
          <Card>
            <Card.Title
              style={{ backgroundColor: "lightgreen", height: 50 }}
              className="text-center p-2 mb-5"
            >
              Edit Profile
            </Card.Title>
            <Card.Body>
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
                  {errors.email && (
                    <Alert variant={"danger"}>{errors.email}</Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter email"
                    name="username"
                    autoFocus
                    value={data.username}
                    onChange={this.handleChange}
                  />
                  {errors.username && (
                    <Alert variant={"danger"}>{errors.username}</Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first_name"
                    name="first_name"
                    value={data.first_name}
                    onChange={this.handleChange}
                  />
                  {errors.first_name && (
                    <Alert variant={"danger"}>{errors.first_name}</Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last_name"
                    name="last_name"
                    value={data.last_name}
                    onChange={this.handleChange}
                  />
                  {errors.last_name && (
                    <Alert variant={"danger"}>{errors.last_name}</Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="text"
                    name="bio"
                    value={data.bio}
                    onChange={this.handleChange}
                  />
                  {errors.bio && <Alert variant={"danger"}>{errors.bio}</Alert>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last_name"
                    name="city"
                    value={data.city}
                    onChange={this.handleChange}
                  />
                  {errors.city && (
                    <Alert variant={"danger"}>{errors.city}</Alert>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    onChange={this.handleChange}
                    value={data.gender}
                  >
                    <option hidden>Please Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                  {errors.gender && (
                    <Alert variant={"danger"}>{errors.gender}</Alert>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_birth"
                    onChange={this.handleChange}
                    value={data.date_of_birth}
                  />
                  {errors.date_of_birth && (
                    <Alert variant={"danger"}>{errors.date_of_birth}</Alert>
                  )}
                </Form.Group>

                {/* <Form.Group>
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
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    name="password2"
                    onChange={this.handleChange}
                  />
                  {errors.password2 && (
                    <Alert variant={"danger"}>{errors.password2}</Alert>
                  )}
                </Form.Group> */}
                <Form.Group>
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
