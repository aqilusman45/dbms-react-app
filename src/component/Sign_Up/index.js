import React from "react";
import { SignUpForm } from "../Sign_Up_Form";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Row, Col } from "antd";

const INITIAL_STATE = {
  email: "",
  uid: "",
  passwordOne: "",
  passwordTwo: "",
  franchise: "",
  error: null
};

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount(){
    this.setState({
      franchise: this.props.match.params.franchise,
    })
  }

  onSubmit = event => {
    event.preventDefault();
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(this.state.passwordOne)) {
      this.setState({
        error: {
          message: `Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters`
        }
      });
    } else {
      const { email, passwordOne } = this.state;
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          const uid = authUser.user.uid;
          this.props.firebase.users(uid).set(
            {
              email,
              uid,
              userrole: "user",
              franchise: this.state.franchise
            },
            { merge: true }
          );
          return authUser;
        })
        .then(() => {
          this.setState({
            ...INITIAL_STATE
          });
          this.props.history.push(`${this.props.match.params.franchise}${ROUTES.DASHBOARD}/`);
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  };

  onFocusInput = () => {
    this.setState({
      error: ""
    });
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
          <SignUpForm
            formInputs={this.state}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onFocusInput={this.onFocusInput}
          />
        </Col>
      </Row>
    );
  }
}

const SignUp = withRouter(withFirebase(SignUpComponent));

export { SignUp };
