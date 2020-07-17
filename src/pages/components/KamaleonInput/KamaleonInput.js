import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '~/components';

export default function KamaleonInput(props) {
  const { disabled, className, style, ...attributes } = props;

  return (
    <Input
      {...attributes}
      className={`${className} ${disabled ? '' : 'bg-white'}`}
      style={
        disabled
          ? {
              ...style,
              cursor: 'not-allowed',
            }
          : { ...style }
      }
    />
  );
}

KamaleonInput.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

KamaleonInput.defaultProps = {
  disabled: false,
  className: '',
  style: {},
};
