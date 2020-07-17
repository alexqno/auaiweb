import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'react-router-dom';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import '~/config/ReactotronConfig';

import AppLayout from '~/layout/default';
import { RoutedContent } from '~/routes';
import history from '~/services/history';

import packageJson from '~/../package.json';

import { store, persistor } from '~/store';
import { setupInterceptor } from '~/services/auaiApi';

if (process.env.REACT_APP_ENV === 'development') {
  fetch('/meta.json')
    .then(response => response.json())
    .then(meta => {
      global.appVersion = meta.devVersion;
    });
} else {
  global.appVersion = packageJson.version;
}

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

export default function AppClient() {
  useEffect(() => {
    setupInterceptor(store);
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <AppLayout>
          <RoutedContent />
        </AppLayout>
        <ToastContainer autoClose={5000} draggable={false} />
      </Router>
    </PersistGate>
  );
}
