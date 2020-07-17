import React from 'react';
import PropTypes from 'prop-types';

export default function FooterText(props) {
  const { year, name } = props;

  return (
    <React.Fragment>
      {global.appVersion}
      <br />
      <i className="fa fa-fw fa-copyright" />
      {year} Direitos reservados.
      <br />
      {name}.
      <br />
      Desenvolvido por{' '}
      <a
        href="http://www.kamaleon.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar__link"
      >
        Kamaleon TI
      </a>
    </React.Fragment>
  );
}
FooterText.propTypes = {
  year: PropTypes.node,
  name: PropTypes.node,
};
FooterText.defaultProps = {
  year: '2020',
  name: 'Auai Support Tracker',
};
