import React from 'react';
import PropTypes from 'prop-types';
import ReduxBlockUi from 'react-block-ui/redux';

import 'react-block-ui/style.css';

export default function BlockUI(props) {
  const { block, unblock, ...attributes } = props;

  return (
    <ReduxBlockUi
      {...attributes}
      tag="div"
      block={block}
      unblock={unblock}
      loader={
        <>
          <i
            className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"
            style={{
              color: '#b8bcc2',
            }}
          />
          <div
            style={{
              paddingTop: '10px',
              color: '#b8bcc2',
            }}
          >
            <strong>CARREGANDO</strong>
          </div>
        </>
      }
    />
  );
}

BlockUI.propTypes = {
  block: PropTypes.string,
  unblock: PropTypes.string,
};

BlockUI.defaultProps = {
  block: 'BLOCK_UI',
  unblock: 'UNBLOCK_UI',
};
