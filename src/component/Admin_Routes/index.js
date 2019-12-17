import React from "react";
import { Route, Switch } from "react-router-dom";
import UserManagement from "../User_Management";
import AddNewMember from "../Add_New_Member";

const NoMatch = () => <h1>404</h1>;



const AdminDashboardRoutes = () => {
    return (
      <>
        <Switch>
          <Route path={'/admin/members/add-member'} component={AddNewMember} />
          <Route path={`/`} component={UserManagement} />
            <Route component={NoMatch} />
        </Switch>
      </>
    );
  }

export default AdminDashboardRoutes;
