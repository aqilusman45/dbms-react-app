import React from 'react';
import { ChangePassword } from "../Change_Password";
import { SignOut } from '../SignOut';
import {withAuthorization} from '../Session';

export const AccountSettings = () => (
    <div className="SignIn-Page">
        <div className="SignIn-Form-Wrapper">
            <div className="SignIn-Form">
                <h1>Account Settings</h1>
                <ChangePassword />
                <SignOut />
            </div>
        </div>
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountSettings);
