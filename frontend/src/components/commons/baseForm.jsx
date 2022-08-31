import  { Component } from "react";
import Joi from "joi-browser";
class BaseForm extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    //console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    //console.log(this.state.data);
    //console.log(errors);
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validatePasswordRepeat = ({ name, value }) => {
    const obj = { [name]: value, ["password1"]: this.state.data["password1"] };
    const schema = {
      [name]: this.schema[name],
      ["password1"]: this.schema["password1"],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.data)
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.submitToServer();
  };
  handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
    console.log(input);
    const errors = { ...this.state.errors };
    let errorMessage = "";
    if (input.name === "password2")
      errorMessage = this.validatePasswordRepeat(input);
    else if(input.name !== "group1") errorMessage = this.validateProperty(input);
    //console.log(errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    console.log(data);
    this.setState({ data, errors });
  };
}

export default BaseForm;
