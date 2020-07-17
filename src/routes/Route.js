import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const semverGreaterThan = useCallback((versionA, versionB) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
      const a = Number(versionsA.shift());

      const b = Number(versionsB.shift());
      // eslint-disable-next-line no-continue
      if (a === b) continue;
      // eslint-disable-next-line no-restricted-globals
      return a > b || isNaN(b);
    }
    return false;
  }, []);

  useEffect(() => {
    fetch('/meta.json')
      .then(response => response.json())
      .then(meta => {
        const currentVersion = global.appVersion;

        let latestVersion = meta.version;
        if (process.env.REACT_APP_ENV === 'development') {
          latestVersion = meta.devVersion;
        }

        const shouldForceRefresh = semverGreaterThan(
          latestVersion,
          currentVersion
        );

        if (shouldForceRefresh) {
          window.location.reload(true);
        }
      });
  }, [Component, semverGreaterThan]);

  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/pages/notsigned" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/call" />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
