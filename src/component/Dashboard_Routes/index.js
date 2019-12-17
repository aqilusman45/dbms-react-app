import React from "react";
import { Route, Switch } from "react-router-dom";
import * as ROUTE from "../../constants/routes";
import DashBoardTemp from "../Dashboard_Page";
import DashBoard from "../My_Dashboard";


const NoMatch = () => <h1>404</h1>;



const DashboardRoutes = () => {
    return (
      <>
        <Switch>
          <Route exact path={`/:franchise${ROUTE.DASHBOARD}`} component={DashBoard} />
          <Route path={`/:franchise${ROUTE.DASHBOARD}/:slug`} component={DashBoardTemp} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }

export default DashboardRoutes;
