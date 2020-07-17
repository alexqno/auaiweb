import React from 'react';

import { SidebarMenu } from '../../components';

export default function SidebarMiddleNav() {
  return (
    <SidebarMenu>
      {/* -------- Call ---------*/}
      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-medkit" />}
        title="Atendimentos"
      >
        <SidebarMenu.Item title="Listar" to="/call/list" exact />
        <SidebarMenu.Item title="Cadastrar" to="/call" exact />
      </SidebarMenu.Item>
    </SidebarMenu>
  );
}
