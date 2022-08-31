import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/users';


class Logout extends Component {
    async componentDidMount() {
        await this.props.logout();
        console.log("logout");
        this.props.history.push('/login')
        //window.location = "/login"
    }
    render() { 
        return ( null );
    }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(null,mapDispatchToProps)(Logout);