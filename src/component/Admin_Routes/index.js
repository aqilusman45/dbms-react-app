import React from "react";
import { Route, Switch } from "react-router-dom";
import * as ROUTE from "../../constants/routes";
import ContentManagement from "../Content-Management";
import UserManagement from "../User_Management";
import UserProgress from "../User_Progress";

const NoMatch = () => <h1>404</h1>;



const AdminDashboardRoutes = () => {
    return (
      <>
        <Switch>
          <Route exact path={`/:franchise${ROUTE.ADMIN_DASHBOARD}/${ROUTE.ADMIN_USERS}`} component={UserManagement} />
          <Route path={`/:franchise${ROUTE.ADMIN_DASHBOARD}/${ROUTE.ADMIN_USERS}/:uid`} component={UserProgress} />
          <Route path={`/:franchise${ROUTE.ADMIN_DASHBOARD}/${ROUTE.ADMIN_PAGES}`} component={ContentManagement} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }

export default AdminDashboardRoutes;
