import React, { Component } from "react";
import moment from "moment";
import { Button, Card,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
class  SurveyCard extends Component {
  render() {
    const { survey, auth } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <Card className="mt-4 p-2 text-center">
          <Card.Title className=" d-flex"> 
            <Row>
              <Col>
                <h3 className="text-center">
                    {survey.title}
                </h3>
                <div className="" style={{ fontSize: 10, fontWeight: 700 }}>
                  {moment(survey.date_created).format("Do MMMM,YYYY")}
                </div>
              </Col>
            </Row>
          </Card.Title>
          <Card.Body className="survey-content">
          <Button variant="seconday"><Link to={"/surveys/"+ survey.id}>Start Survey</Link></Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default SurveyCard;