import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { Store } from './Store';

import Dashboard from './components/Dashboard';

const AuthGuard = ({componentName, component}) => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;

    const auth = ( adminInfo != null ) ? true : null ;
    // If has token, return outlet in other case return navigate to login page

    if(auth) {

      console.log(componentName);

      if(adminInfo[0].can_access.split(',').includes(componentName)) {
        return <React.Fragment>{component}</React.Fragment>
      } else {
        return <React.Fragment>{<Dashboard />}</React.Fragment>
      }

      return <React.Fragment>{component}</React.Fragment>

    } else {
      return <Navigate to="/" />
    }

}

export default AuthGuard
