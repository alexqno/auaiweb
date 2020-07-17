import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LogoThemed } from '../LogoThemed/LogoThemed';

export default function HeaderAuth(props) {
  const { icon, iconClassName, title, text } = props;

  return (
    <div className="mb-4">
      <div className="mb-4 text-center">
        <Link to="/" className="d-inline-block">
          {icon ? (
            <i className={`fa fa-${icon} fa-3x ${iconClassName}`} />
          ) : (
            <LogoThemed checkBackground height="30" />
          )}
        </Link>
      </div>
      <h5 className="text-center mb-4">{title}</h5>
      <p className="text-center">{text}</p>
    </div>
  );
}
HeaderAuth.propTypes = {
  icon: PropTypes.node,
  iconClassName: PropTypes.node,
  title: PropTypes.node,
  text: PropTypes.node,
};
HeaderAuth.defaultProps = {
  icon: null,
  title: '',
  text: '',
  iconClassName: 'text-theme',
};
