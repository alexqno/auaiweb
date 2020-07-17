import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';

export function HeaderDemo({ className, no, title, subTitle, children }) {
  return (
    <Media className={`mb-3 ${className}`}>
      <Media left top>
        <h1 className="mr-3 display-4 text-muted">{no}.</h1>
      </Media>
      <Media body>
        <h4 className="mt-1">{title}</h4>
        <p>{children || subTitle}</p>
      </Media>
    </Media>
  );
}
HeaderDemo.propTypes = {
  no: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
HeaderDemo.defaultProps = {
  no: 0,
  title: 'Waiting for Data...',
  subTitle: '',
};
