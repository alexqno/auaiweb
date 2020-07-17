import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

// ----------- Call Imports ---------------
import Call from '~/pages/Call';
import CallIndex from '~/pages/Call/Listar';

import Login from '~/pages/Login';
import UpdatePassword from '~/pages/UpdatePassword';
import Error404 from '~/pages/Error404';

export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/login" exact />

      {/*    Call Routes    */}
      <Route path="/call/list" component={CallIndex} isPrivate exact />
      <Route path="/call/:protocol" component={Call} exact isPrivate />
      <Route path="/call" component={Call} isPrivate exact />

      {/*    Auth Routes    */}
      <Route path="/login" component={Login} />
      <Route path="/updatePassword" component={UpdatePassword} />

      {/*    404    */}
      <Route path="/pages/error-404" component={Error404} />

      <Redirect to="/pages/error-404" />
    </Switch>
  );
};
