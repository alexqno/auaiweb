import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '../../../components/Theme';

const logos = {
  white: require('~/assets/logos/logo-white.svg'),
  primary: require('~/assets/logos/logo_kamaleon.png'),
  success: require('~/assets/logos/logo-success.svg'),
  warning: require('~/assets/logos/logo-warning.svg'),
  danger: require('~/assets/logos/logo_kamaleon.png'),
  info: require('~/assets/logos/logo-info.svg'),
  indigo: require('~/assets/logos/logo-indigo.svg'),
  purple: require('~/assets/logos/logo-purple.svg'),
  pink: require('~/assets/logos/logo-pink.svg'),
  yellow: require('~/assets/logos/logo-yellow.svg'),
};

const getLogoUrl = (style, color) => {
  return logos[color];
};

// Check for background
const getLogoUrlBackground = (style, color) => {
  // if (style === 'color') {
  //   return logos.white;
  // }
  return getLogoUrl(style, color);
};

const LogoThemed = ({ checkBackground, className, ...otherProps }) => (
  <>
    <ThemeConsumer>
      {({ style, color }) => (
        <img
          src={
            checkBackground
              ? getLogoUrlBackground(style, color)
              : getLogoUrl(style, color)
          }
          className={classNames('d-block', className)}
          alt="Airframe Logo"
          {...otherProps}
        />
      )}
    </ThemeConsumer>
    {process.env.REACT_APP_ENV === 'development' && (
      <center>
        <h4>
          <strong className="text-light-09">HOMOLOGAÇÃO</strong>
        </h4>
      </center>
    )}
  </>
);
LogoThemed.propTypes = {
  checkBackground: PropTypes.bool,
  className: PropTypes.string,
};

export { LogoThemed };
