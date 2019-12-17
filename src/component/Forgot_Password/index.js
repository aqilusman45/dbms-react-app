import React from "react";
import { ForgotPasswordForm } from "../Forgot_Password_Form";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";

// import './styles.css'

const INITIAL_STATE = {
  email: "",
  error: null,
  onSuccess: null
};

class ForgetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .forgotPassword(email)
      .then(() => {
        const onSuccess = "Password reset email sent. Please check inbox. ";
        this.setState({
          email: "",
          onSuccess
        });
      })
      .catch(error => {
        this.setState({
          email: "",
          error
        });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Row>
        <Col
          sm={{
            span: 14,
            offset: 5
          }}
        >
          <ForgotPasswordForm
            formInputs={this.state}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Col>
      </Row>
    );
  }
}

const ForgotPassword = withRouter(withFirebase(ForgetPasswordComponent));

export { ForgotPassword };
