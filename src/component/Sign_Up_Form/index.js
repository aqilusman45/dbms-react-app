import React from "react";

import { Input, Tooltip, Icon } from "antd";
import { Button } from "antd";

export const SignUpForm = props => {
  const { email, passwordOne, passwordTwo, error } = props.formInputs;
  const isDisabled =
    email === "" ||
    passwordOne === "" ||
    passwordTwo === "" ||
    passwordOne !== passwordTwo;

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <label>
          Email
          <Input
            type="email"
            name="email"
            value={email}
            onChange={props.onChange}
            placeholder="Enter your Email"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            suffix={
              <Tooltip title="Enter Valid Email">
                <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </label>
        <label>
          Password
          <Input.Password
            type="password"
            name="passwordOne"
            onFocus={() => props.onFocusInput()}
            value={passwordOne}
            onChange={props.onChange}
          />
        </label>
        <label>
          Confirm Password
          <Input.Password
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            onFocus={() => props.onFocusInput()}
            onChange={props.onChange}
          />
        </label>
        <div className="submit-button">
          <Button disabled={isDisabled} htmlType="submit" type="primary" block>
            Submit
          </Button>
        </div>
      </form>
      {error ? <p>{error.message}</p> : <p />}
    </>
  );
};
