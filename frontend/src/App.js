import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './components/commons/protectedRoute';
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home";
import Survey from "./components/survey";



class App extends Component {
  render() {
   // console.log("abcd");
    const { auth } = this.props;
   // console.log(auth);
    return (
      <React.Fragment>
        <ToastContainer />
        
        <NavBar auth={auth} />
        <div className="">
          <Switch>
            <ProtectedRoute
              path="/login"
              component={LoginForm}
              type="guest"
              auth={auth}
            />
            <ProtectedRoute
              path="/register"
              component={RegisterForm}
              type="guest"
              auth={auth}
            />
            <ProtectedRoute
              path="/logout"
              component={Logout}
              type="private"
              auth={auth}
            />
            <Route path="/surveys/:survey_id" auth={auth} component={Survey}/>
            <Route path="/" auth={auth} component={Home}/>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);