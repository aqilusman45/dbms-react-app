import React, { Component } from "react";
import { Menu, Button } from "antd";
import { AuthUserContext } from "../Session";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

class MasterAdminNavbarBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "mail",
            visible: false
        };
    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <>
            <div className="logo">
         <h3 style={{margin: 0}} >Admin</h3>
        </div>
                <Menu
                    theme="Light"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item className="sign-out">
                        <AuthUserContext.Consumer>
                            {authuser =>
                                authuser ? (
                                    <Button onClick={this.props.firebase.doSignOut}>
                                        Sign Out
                      </Button>
                                ) : null
                            }
                        </AuthUserContext.Consumer>
                    </Menu.Item>
                </Menu>
            </>
        );
    }
}

const MasterAdminNavbar = withRouter(withFirebase(MasterAdminNavbarBase));

export default MasterAdminNavbar;
