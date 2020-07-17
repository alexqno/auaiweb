import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer,
  FormFeedback,
} from '~/components';

import { KamaleonInput } from '~/pages/components';

import HeaderAuth from '~/routes/components/Pages/HeaderAuth';
import FooterAuth from '~/routes/components/Pages/FooterAuth';

import auaiApi from '~/services/auaiApi';
import history from '~/services/history';

import { notification } from '~/utilities/notification';

export default function UpdatePassword() {
  const { email, nome: usuario } = useSelector(state => state.user.profile);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [checkPassValidity, setCheckPassValidity] = useState(false);
  const [passLengthOk, setPassLengthOk] = useState(false);
  const [passHasNumber, setPassHasNumber] = useState(false);
  const [passHasSmallLetters, setPassHasSmallLetter] = useState(false);
  const [passHasCapitalLetters, setPassHasCapitalLetter] = useState(false);

  const [
    checkPassConfirmationValidity,
    setCheckPassConfirmationValidity,
  ] = useState(false);
  const [passConfirmationMatches, setPassConfirmationMatches] = useState(false);

  const [okToUpdate, setOkToUpdate] = useState(false);

  useEffect(() => {
    setOkToUpdate(
      password.length > 0 &&
        passLengthOk &&
        passHasNumber &&
        passHasSmallLetters &&
        passHasCapitalLetters &&
        passConfirmationMatches
    );
  }, [
    passConfirmationMatches,
    passHasCapitalLetters,
    passHasNumber,
    passHasSmallLetters,
    passLengthOk,
    password.length,
  ]);

  function handleChangeNewPassword(pass) {
    setNewPassword(pass);
    setCheckPassValidity(pass.length > 0);
    setPassLengthOk(pass.length >= 8);
    setPassHasNumber(!!pass.match(/\d/g));
    setPassHasSmallLetter(!!pass.match(/[a-z]/g));
    setPassHasCapitalLetter(!!pass.match(/[A-Z]/g));

    setPassConfirmationMatches(pass === newPasswordConfirmation);
  }

  function handleChangeNewPasswordConfirmation(confirmPass) {
    setNewPasswordConfirmation(confirmPass);
    setCheckPassConfirmationValidity(confirmPass.length > 0);

    setPassConfirmationMatches(confirmPass === newPassword);
  }

  async function handleConfirmar(e) {
    e.preventDefault();

    try {
      await auaiApi.post('/atualizarSenha', {
        email,
        password,
        newPassword,
      });

      notification('success', 'Sucesso', 'Senha atualizada');
      history.push('');
    } catch (error) {
      notification(
        'error',
        'Erro',
        'Erro ao atualizar a senha. Verifique os dados informados e tente novamente.'
      );
    }
  }

  return (
    <EmptyLayout>
      <EmptyLayout.Section center width={480}>
        {/* START Header */}
        <HeaderAuth title="Atualização de Senha" />
        {/* END Header */}
        {/* START Form */}
        <Form className="mb-3" onSubmit={handleConfirmar}>
          <FormGroup>
            <Label for="email">E-Mail</Label>
            <KamaleonInput name="email" id="email" value={email} disabled />
          </FormGroup>
          <FormGroup>
            <Label for="usuario">Usuário</Label>
            <KamaleonInput
              name="usuario"
              id="usuario"
              value={usuario}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Senha Atual</Label>
            <KamaleonInput
              type="password"
              name="password"
              id="password"
              placeholder="Informe sua senha atual"
              className="bg-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">Nova Senha</Label>
            <KamaleonInput
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Informe a nova senha"
              className="bg-white"
              value={newPassword}
              onChange={e => handleChangeNewPassword(e.target.value)}
              valid={
                checkPassValidity &&
                passLengthOk &&
                passHasNumber &&
                passHasSmallLetters &&
                passHasCapitalLetters
              }
              invalid={
                checkPassValidity &&
                !(
                  passLengthOk &&
                  passHasNumber &&
                  passHasSmallLetters &&
                  passHasCapitalLetters
                )
              }
            />
            {checkPassValidity && (
              <>
                {!passLengthOk && (
                  <FormFeedback>
                    A senha deve ter, no mínimo, 8 caracteres
                  </FormFeedback>
                )}
                {!passHasNumber && (
                  <FormFeedback>
                    A senha deve ter pelo menos um numero
                  </FormFeedback>
                )}
                {!passHasSmallLetters && (
                  <FormFeedback>
                    A senha deve ter pelo menos uma letra minúscula
                  </FormFeedback>
                )}
                {!passHasCapitalLetters && (
                  <FormFeedback>
                    A senha deve ter pelo menos uma letra maiúscula
                  </FormFeedback>
                )}
              </>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="newPasswordConfirmation">Confirmação de senha</Label>
            <KamaleonInput
              type="password"
              name="newPasswordConfirmation"
              id="newPasswordConfirmation"
              placeholder="Repita a nova senha"
              className="bg-white"
              value={newPasswordConfirmation}
              onChange={e =>
                handleChangeNewPasswordConfirmation(e.target.value)
              }
              valid={checkPassConfirmationValidity && passConfirmationMatches}
              invalid={
                checkPassConfirmationValidity && !passConfirmationMatches
              }
            />
            {checkPassValidity && (
              <>
                {!passConfirmationMatches && (
                  <FormFeedback>As senhas não são iguais</FormFeedback>
                )}
              </>
            )}
          </FormGroup>
          <ThemeConsumer>
            {({ color }) => (
              <Button
                color={color}
                block
                type="submit"
                className="ml-auto px-4"
                disabled={!okToUpdate}
              >
                Atualizar Senha
              </Button>
            )}
          </ThemeConsumer>
        </Form>
        {/* END Form */}
        {/* START Bottom Links */}
        <div className="d-flex mb-5">
          <Link to="/" className="text-decoration-none">
            Voltar para o Login
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
