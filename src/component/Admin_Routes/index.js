import React from "react";
import { Route, Switch } from "react-router-dom";
import UserManagement from "../User_Management";
import AddNewMember from "../Add_New_Member";
import ViewMember from "../ViewMember";
import NamazTimes from "../Namaz_Times";
import AddNewNamaz from "../Add_Namaz";

const NoMatch = () => <h1>404</h1>;



const AdminDashboardRoutes = () => {
    return (
      <>
        <Switch>
          <Route path={'/admin/members/add-member'} component={AddNewMember} />
          <Route path={'/admin/namaz-times/add-namaz'} component={AddNewNamaz} />
          <Route path={'/admin/members/:id'} component={ViewMember} />
          <Route path={'/admin/namaz-times'} component={NamazTimes} />          
          <Route path={`/`} component={UserManagement} />
            <Route component={NoMatch} />
        </Switch>
      </>
    );
  }

export default AdminDashboardRoutes;
