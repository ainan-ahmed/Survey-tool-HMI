import React from "react";
import BaseForm from "./commons/baseForm";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { getSurvey } from "../store/surveys";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

class Survey extends BaseForm {
  state = {
    startDate: new Date(),
    data: {
      email: "",
      first_name: "",
      last_name: "",
      gender: "",
    },
    survey: [],
    errors: {},
  };
  async componentDidMount() {
    let { survey } = this.props.surveys;
    //survey.filter((s) => s.id === this.props.match.params.survey_id);
    this.setState({
      survey: survey
        .filter((s) => s.id === this.props.match.params.survey_id)
        .at(0),
    });
    let button = this.getButtonType();
  }
  getButtonType(x) {
    console.log(x)
    if (x["button"] === "radioButton") return "radio";
    if (x["button"] === "checkboxes") return "checkbox";
  }
  componentDidUpdate(prevProps) {
    console.log(this.state)
    if (this.props.error.msg !== prevProps.error.msg) {
      this.setState({ errors: this.props.error.msg });
    }
  }
  schema = {
    email: Joi.string().required().email().label("Email"),
    first_name: Joi.string().required().label("First name"),
    last_name: Joi.string().required().label("Last name"),
    date_of_birth: Joi.string().required().label("Date of birth"),
    gender: Joi.string().required().label("Gender"),
  };

  submitToServer = async () => {
    //call the server
    console.log(this.state.data);
    const { email, first_name, last_name, date_of_birth, gender } =
      this.state.data;
    try {
      await this.props.register(
        email,
        first_name,
        last_name,
        date_of_birth,
        gender
      );
    } catch (error) {
      let errors = { ...this.state.errors };
      const serverError = error.response.data;
      errors.email = serverError["email"];
      errors.first_name = serverError["first_name"];
      errors.last_name = serverError["last_name"];
      errors.date_of_birth = serverError["date_of_birth"];
      this.setState({ errors });
      console.log(this.state.errors);
    }
    //console.log("submitted");
  };
  render() {
    const { data, errors } = this.state;
    const { questions } = this.state.survey;
    console.log(questions);

    return (
      <Container className="mt-5">
        <h1 className="text-center">Survey</h1>
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
            {errors.email && <Alert variant={"danger"}>{errors.email}</Alert>}
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="first_name"
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
              type="last_name"
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
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              onChange={this.handleChange}
            >
              <option hidden>Please Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
            {errors.gender && <Alert variant={"danger"}>{errors.gender}</Alert>}
          </Form.Group>
          <hr style={{ height: "3px" }} className="mt-5" />
          <h2 className="bold text-center">Survey Questionnaire</h2>
          <hr />
          <Form.Group></Form.Group>
          {questions &&
            questions.map((q) =>  (

              <React.Fragment>
                <Form.Group>
                  <p class="fw-bold">{q["title"]}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    inline
                    label={q["choice1"]}
                    name="group1"
                    type={this.getButtonType(q)}
                    onChange={this.handleChange}
                   // id={`inline-${type}-1`}
                   value= {q["choice1"]}
                  />
                </Form.Group>
                <Form.Group>
                 
                  <Form.Check
                    inline
                    label={q["choice2"]}
                    name="group2"
                    type={this.getButtonType(q)}
                   // id={`inline-${type}-2`}
                   onChange={this.handleChange}
                    value= {q["choice2"]}
                  />
                </Form.Group>
                <Form.Group>
                 
                  <Form.Check
                    inline
                    label={q["choice3"]}
                    name="group3"
                    type={this.getButtonType(q)}
                   // id={`inline-${type}-2`}
                   value= {q["choice3"]}
                  />
                </Form.Group>
                <Form.Group>
                 
                  <Form.Check
                    inline
                    label={q["choice4"]}
                    name="group4"
                    type={this.getButtonType(q)}
                   // id={`inline-${type}-2`}
                   value= {q["choice4"]}
                  />
                </Form.Group>
                <Form.Group>
                 
                  <Form.Check
                    inline
                    label={q["choice5"]}
                    name="group5"
                    type={this.getButtonType(questions)}
                    value= {q["choice5"]}
                   // id={`inline-${type}-2`}
                  />
                </Form.Group>
              </React.Fragment>
            ))}
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
  auth: state.auth,
  surveys: state.surveys,
});
const mapDispatchToProps = (dispatch) => ({
  getSurvey: (id) => dispatch(getSurvey(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Survey);
