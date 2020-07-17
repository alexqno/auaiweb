import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ReCAPTCHA from 'react-google-recaptcha';

import {
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer,
} from '~/components';

import { loginRequest } from '~/store/modules/auth/actions';

import HeaderAuth from '~/routes/components/Pages/HeaderAuth';
import FooterAuth from '~/routes/components/Pages/FooterAuth';

import { store } from '~/store';
import { setupInterceptor } from '~/services/auaiApi';

import { notification } from '~/utilities/notification';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaKey, setRecaptchaKey] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  const captchaRef = useRef();

  useEffect(() => {
    setupInterceptor(store);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (!recaptchaKey || recaptchaKey === '') {
      notification('error', 'Erro', 'Valide o ReCAPTCHA para fazer login!');
      return;
    }
    dispatch(loginRequest(login, password, recaptchaKey));
  }

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        {/* START Header */}
        <HeaderAuth />
        {/* END Header */}
        {/* START Form */}
        <Form className="mb-3" onSubmit={handleLogin}>
          <FormGroup>
            <Label for="login">Login</Label>
            <Input
              name="login"
              id="login"
              placeholder="Informe seu login"
              className="bg-white"
              value={login}
              autoComplete="off"
              onChange={event => setLogin(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Senha</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Informe sua senha"
              className="bg-white"
              value={password}
              autoComplete="off"
              onChange={event => setPassword(event.target.value)}
            />
            <FormText color="muted">
              Nunca compartilhe suas informações de login
            </FormText>
          </FormGroup>
          <ReCAPTCHA
            style={{ display: 'inline-block' }}
            sitekey={process.env.REACT_APP_ReCAPTCHA_SITE_KEY}
            onChange={() => setRecaptchaKey(captchaRef.current.getValue())}
            ref={captchaRef}
          />
          <ThemeConsumer>
            {({ color }) => (
              <Button
                color={color}
                type="submit"
                block
                disabled={!recaptchaKey || recaptchaKey === ''}
                style={
                  !recaptchaKey || recaptchaKey === ''
                    ? { cursor: 'not-allowed' }
                    : null
                }
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </Button>
            )}
          </ThemeConsumer>
        </Form>
        {/* END Form */}
        {/* START Bottom Links */}
        <div className="d-flex mb-5">
          <Link to="/pages/forgotpassword" className="text-decoration-none">
            Esqueci minha senha
          </Link>
        </div>
        {/* END Bottom Links */}
        {/* START Footer */}
        <FooterAuth />
        {/* END Footer */}
      </EmptyLayout.Section>
    </EmptyLayout>
  );
}
