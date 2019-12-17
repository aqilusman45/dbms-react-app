import React from "react";
import { Route, Switch } from "react-router-dom";
import * as ROUTE from "../../constants/routes";
import CreateFranchise from "../Master_Admin_Create_Franchise";
import ClientLists from "../Master_Admin_View_Clients";
import EditFranchise from "../Master_Admin_Edit_Client";
import MasterUserManagement from "../Master_Admin_User_Management";
import UserProgress from "../Master_Admin_User_Details";


const NoMatch = () => <h1>404</h1>;



const MasterAdminDashboardRoutes = () => {
    return (
      <>
        <Switch>
          <Route exact path={`${ROUTE.MASTER_ADMIN}/${ROUTE.MASTER_ADMIN_ADD_FRANCHISE}`} component={CreateFranchise} />
          <Route exact path={`${ROUTE.MASTER_ADMIN}/${ROUTE.MASTER_ADMIN_VIEW_USERS}`} component={MasterUserManagement} />
          <Route exact path={`${ROUTE.MASTER_ADMIN}/${ROUTE.MASTER_ADMIN_VIEW_USERS}/:uid`} component={UserProgress} />          
          <Route path={`${ROUTE.MASTER_ADMIN}/${ROUTE.MASTER_ADMIN_VIEW_CLIENTS}`} component={ClientLists} />
          <Route path={`${ROUTE.MASTER_ADMIN}/:franchise`} component={EditFranchise} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }

export default MasterAdminDashboardRoutes;
