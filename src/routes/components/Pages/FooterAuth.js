import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import FooterText from '~/routes/components/FooterText';

export default function FooterAuth({ className }) {
  return (
    <p className={classNames(className, 'small')}>
      <FooterText />
    </p>
  );
}

FooterAuth.propTypes = {
  className: PropTypes.string,
};

FooterAuth.defaultProps = {
  className: '',
};
