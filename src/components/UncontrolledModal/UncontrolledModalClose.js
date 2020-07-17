import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { Consumer } from './context';

const UncontrolledModalClose = props => {
  const { tag, ...otherProps } = props;
  const Tag = tag;

  return (
    <Consumer>
      {value => (
        <Tag
          {...otherProps}
          onClick={() => {
            value.toggleModal();
            if (props.onClick) {
              props.onClick();
            }
          }}
        />
      )}
    </Consumer>
  );
};
UncontrolledModalClose.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onClick: PropTypes.func,
};
UncontrolledModalClose.defaultProps = {
  tag: Button,
  onClick: undefined,
};

export { UncontrolledModalClose };
