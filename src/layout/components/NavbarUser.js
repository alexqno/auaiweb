import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { NavItem, NavLink } from '~/components';

import { logoff } from '~/store/modules/auth/actions';

export default function NavbarUser(props) {
  const dispatch = useDispatch();

  function doLogoff() {
    dispatch(logoff());
  }

  return (
    <NavItem {...props}>
      <NavLink tag={Link} onClick={doLogoff} to="#">
        <i className="fa fa-power-off" /> Sair
      </NavLink>
    </NavItem>
  );
}
