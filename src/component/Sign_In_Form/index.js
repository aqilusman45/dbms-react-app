import React from "react";
import "./styles.css";
import { Input, Tooltip, Icon } from "antd";
import { Button } from "antd";

export const SignInForm = props => {
  const { email, password, error } = props.formInputs;

  const isDisabled = email === "" || password === "";

  return (
    <>
      <div>
        <form onSubmit={props.onSubmit}>
          <label>
            Email
            <Input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={props.onChange}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              suffix={
                <Tooltip title="Enter Valid Email">
                  <Icon
                    type="info-circle"
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                </Tooltip>
              }
            />
          </label>
          <label>
            Password
            <Input.Password
              type="password"
              name="password"
              value={password}
              onChange={props.onChange}
              placeholder="input password"
            />
          </label>
          <div className="submit-button">
            <Button disabled={isDisabled} htmlType="submit" type="primary" block>
              Submit
            </Button>
          </div>
        </form>
        {error ? <p>{error.message}</p> : <p />}
      </div>
    </>
  );
};
