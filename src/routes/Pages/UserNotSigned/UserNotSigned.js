import React from 'react';

import { EmptyLayout } from '~/components';

import HeaderAuth from '~/routes/components/Pages/HeaderAuth';
import FooterAuth from '~/routes/components/Pages/FooterAuth';

const UserNotSigned = () => (
  <EmptyLayout>
    <EmptyLayout.Section center>
      {/* START Header */}
      <HeaderAuth title="Sessão bloqueada" />
      {/* END Header */}
      <h2 className="text-center mb-4">Faça o login novamente</h2>
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayout.Section>
  </EmptyLayout>
);

export default UserNotSigned;
