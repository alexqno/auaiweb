import React from 'react';
import { Switch, Route } from 'react-router-dom';

// ----------- Pages Imports ---------------
import NavbarOnly from './Layouts/NavbarOnly';
import SidebarWithNavbar from './Layouts/SidebarWithNavbar';

// ----------- Layout Imports ---------------
import { DefaultNavbar } from '../layout/components/DefaultNavbar';
import { DefaultSidebar } from '../layout/components/DefaultSidebar';

import { SidebarANavbar } from '../layout/components/SidebarANavbar';
import { SidebarASidebar } from '../layout/components/SidebarASidebar';

// ------ Custom Layout Parts --------
export const RoutedNavbars = () => (
  <Switch>
    {/* Other Navbars: */}
    <Route component={SidebarANavbar} path="/layouts/sidebar-a" />
    <Route component={NavbarOnly.Navbar} path="/layouts/navbar" />
    <Route component={SidebarWithNavbar.Navbar} path="/layouts/sidebar-with-navbar"/>

    {/* Default Navbar: */}
    <Route component={DefaultNavbar} />
  </Switch>
);

export const RoutedSidebars = () => (
  <Switch>
    {/* Other Sidebars: */}
    <Route component={SidebarASidebar} path="/layouts/sidebar-a" />
    <Route
      component={SidebarWithNavbar.Sidebar}
      path="/layouts/sidebar-with-navbar"
    />
    {/* Default Sidebar: */}
    <Route component={DefaultSidebar} />
  </Switch>
);
