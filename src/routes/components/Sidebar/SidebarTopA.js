import React from 'react';
import { useSelector } from 'react-redux';
import { conformToMask } from 'react-text-mask';

import { Sidebar } from '~/components';

import { cpfMask } from '~/utilities/masks';

export default function SidebarTopA() {
  const profile = useSelector(state => state.user.profile);

  return (
    <React.Fragment>
      {/* START: Sidebar Default */}
      <Sidebar.HideSlim>
        <Sidebar.Section className="pt-0">
          {profile && profile.nome}
          <div className="small sidebar__link--muted">
            {profile && (
              <>
                <div>
                  <b>{profile.name}</b>
                </div>
                <div>{profile.email}</div>
              </>
            )}
          </div>
        </Sidebar.Section>
      </Sidebar.HideSlim>
      {/* END: Sidebar Default */}

      {/* START: Sidebar Slim */}
      {/* <Sidebar.ShowSlim>
        <Sidebar.Section>
          <Avatar.Image
            size="sm"
            src={avatarImg}
            addOns={[
              <AvatarAddOn.Icon
                className="fa fa-circle"
                color="white"
                key="avatar-icon-bg"
              />,
              <AvatarAddOn.Icon
                className="fa fa-circle"
                color="success"
                key="avatar-icon-fg"
              />,
            ]}
          />
        </Sidebar.Section>
      </Sidebar.ShowSlim> */}
      {/* END: Sidebar Slim */}
    </React.Fragment>
  );
}
