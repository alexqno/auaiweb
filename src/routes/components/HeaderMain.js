import React from 'react';
import PropTypes from 'prop-types';

export function HeaderMain({ className, title }) {
  return (
    <React.Fragment>
      {/* START H1 Header */}
      <div className={` d-flex ${className}`}>
        <h1 className="display-4 mr-3 mb-0 align-self-start">{title}</h1>
      </div>
      {/* END H1 Header */}
    </React.Fragment>
  );
}

HeaderMain.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.node,
  className: PropTypes.string,
};

HeaderMain.defaultProps = {
  title: 'Waiting for Data...',
  subTitle: '',
  className: 'my-4',
};
