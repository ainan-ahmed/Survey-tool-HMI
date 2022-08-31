import React, { Component } from 'react';
import { Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSurveys} from '../store/surveys';
import SurveyCard from './commons/surveyCard';


class Home extends Component {
    state = {  }
    async componentDidMount()
    {
        await this.props.getSurveys();
    }
    render() { 
        const {survey} = this.props.surveys
        return ( 
            <Row className='mx-auto'>

                <Col md={5}>{survey && survey.map((s) => <SurveyCard survey = {s}/>)}</Col>
            </Row>
         );
    }   
}
 
const mapStateToProps = (state) => ({
  auth: state.auth,
  surveys: state.surveys,
});
const mapDispatchToProps = (dispatch) => ({
    getSurveys: () => dispatch(getSurveys()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);