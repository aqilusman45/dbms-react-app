import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

const SignOutButton = ({ history, firebase }) => {
  return (
    <span
      onClick={() => {
        firebase.doSignOut();
      }}
    >
      Sign Out
    </span>
  );
};

export const SignOut = withRouter(withFirebase(SignOutButton));
