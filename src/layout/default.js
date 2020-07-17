import React from 'react';
import PropTypes from 'prop-types';

import { Layout, ThemeProvider } from '../components';

import '../styles/bootstrap.scss';
import '../styles/main.scss';
import '../styles/plugins/plugins.scss';
import '../styles/plugins/plugins.css';

import { RoutedNavbars, RoutedSidebars } from '../routes/Navbars';

const favIcons = [
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: require('~/assets/favicons/favicon.ico'),
  },

  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: require('~/assets/favicons/apple-touch-icon.png'),
  },

  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: require('~/assets/favicons/favicon-32x32.png'),
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: require('~/assets/favicons/favicon-16x16.png'),
  },
];

export default function AppLayout({ children }) {
  return (
    <ThemeProvider>
      <Layout sidebarSlim favIcons={favIcons}>
        {/* --------- Navbar ----------- */}
        <Layout.Navbar>
          <RoutedNavbars />
        </Layout.Navbar>
        {/* -------- Sidebar ------------*/}
        <Layout.Sidebar>
          <RoutedSidebars />
        </Layout.Sidebar>

        {/* -------- Content ------------*/}
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </ThemeProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
