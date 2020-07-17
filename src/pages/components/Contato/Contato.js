import React, { useState, useEffect, useMemo } from 'react';
import MaskedInput, { conformToMask } from 'react-text-mask';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';

import { Row, Col, FormGroup, Button, Table } from '~/components';

import KamaleonInput from '../KamaleonInput/KamaleonInput';

import auaiApi from '~/services/auaiApi';

import { phoneMask } from '~/utilities/masks';
import { notification } from '~/utilities/notification';
import { defaultPhoneTypes } from '~/utilities/contatos';

export default function Contato(props) {
  const formMethods = useFormContext();

  const {
    fillContatosList,
    parsedTiposContato,
    parsedTiposTelefone,
    usesSmsFlag,
  } = props;

  const contatos = useMemo(() => {
    return fillContatosList[0];
  }, [fillContatosList]);

  const setContatos = useMemo(() => {
    return fillContatosList[1];
  }, [fillContatosList]);

  const tiposTelefone = useMemo(() => {
    return parsedTiposTelefone || defaultPhoneTypes;
  }, [parsedTiposTelefone]);

  const [tiposContato, setTiposContato] = useState([]);
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [maskPhone, setMaskPhone] = useState([]);

  useEffect(() => {
    async function loadTiposContato() {
      if (parsedTiposContato) {
        setTiposContato(parsedTiposContato);
        setTipo(parsedTiposContato[0].value);
      } else {
        try {
          const response = await auaiApi.get('contato/combobox');
          setTiposContato(response.data);
          setTipo(response.data[0].value);
        } catch (error) {
          notification(
            'error',
            'Erro',
            'não foi possivel carregar os tipos de contato para cadastro'
          );
        }
      }
    }

    loadTiposContato();
  }, [parsedTiposContato]);

  function getTipoContato(value) {
    return tiposContato.find(tc => tc.value === value);
  }

  function conformValor(valueType, value) {
    if (tiposTelefone.includes(valueType)) {
      return conformToMask(value, phoneMask(value)).conformedValue;
    }
    return value;
  }

  function handleAdicionarContato(contatoTipo, conformedValor) {
    const valorFinal = tiposTelefone.includes(contatoTipo.value)
      ? conformedValor.replace(/\D/g, '')
      : conformedValor;

    const contatoExists = contatos.find(
      ct => ct.tipo.value === contatoTipo.value && ct.valor === valorFinal
    );
    if (contatoExists) {
      notification('warning', 'Atenção', 'O contato informado já foi inserido');
      return;
    }
    setContatos([
      ...contatos,
      {
        tipo: contatoTipo,
        valor: valorFinal,
        sms: usesSmsFlag && contatos.length === 0,
      },
    ]);
  }

  function handleRemoverContato(contato) {
    setContatos(
      contatos.filter(
        ct => ct.tipo.value !== contato.tipo.value || ct.valor !== contato.valor
      )
    );
  }

  function handleSmsFlag(contato) {
    setContatos(
      contatos.map(ct => ({
        ...ct,
        sms: ct.tipo.value === contato.tipo.value && ct.valor === contato.valor,
      }))
    );
  }

  return (
    <>
      <Row className="align-footer">
        <Col lg={3} sm={4}>
          <FormGroup>
            <KamaleonInput
              type="select"
              name="tipo"
              id="tipo"
              onChange={e => {
                setTipo(e.target.value);
                if (!tiposTelefone.includes(e.target.value)) {
                  setValor('');
                }
              }}
              invalid={formMethods && formMethods.errors.contatos}
            >
              {tiposContato &&
                tiposContato.map(tc => (
                  <option key={tc.value} value={tc.value}>
                    {tc.label}
                  </option>
                ))}
            </KamaleonInput>
          </FormGroup>
        </Col>
        <Col lg={3} sm={6}>
          <FormGroup>
            {tiposTelefone.includes(tipo) ? (
              <KamaleonInput
                type=""
                name="valor"
                id="valor"
                placeholder="Informe o contato"
                value={valor}
                onChange={e => setValor(e.target.value)}
                tag={MaskedInput}
                mask={maskPhone}
                onKeyPress={e => setMaskPhone(phoneMask((valor || '') + e.key))}
                invalid={formMethods && formMethods.errors.contatos}
              />
            ) : (
              <KamaleonInput
                type=""
                name="valor"
                id="valor"
                placeholder="Informe o contato"
                value={valor}
                onChange={e => setValor(e.target.value)}
                invalid={formMethods && formMethods.errors.contatos}
              />
            )}
          </FormGroup>
        </Col>
        <Col sm={1}>
          <Button
            outline
            title="Adicionar"
            color="primary"
            onClick={() => handleAdicionarContato(getTipoContato(tipo), valor)}
          >
            <i className="fa fa-fw fa-plus" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Table className="mb-0" hover responsive>
            <thead>
              <tr>
                <th className="bt-0" width="50%">
                  Tipo
                </th>
                <th className="bt-0" width="50%">
                  Valor
                </th>
                {usesSmsFlag && <th className="bt-0" width="1%" />}
                <th className="bt-0" width="1%" />
              </tr>
            </thead>
            <tbody>
              {contatos.map(contato => (
                <tr className="" key={`${contato.tipo.value}${contato.valor}`}>
                  <td className="align-middle">{contato.tipo.label}</td>
                  <td className="align-middle">
                    {conformValor(contato.tipo.value, contato.valor)}
                  </td>
                  {usesSmsFlag && (
                    <td className="align-middle">
                      {contato.sms ? (
                        <Button
                          className="mr-2"
                          size="sm"
                          title="Telefone padrâo para sms"
                          color="success"
                          onClick={() => {}}
                          disabled
                        >
                          <i className="fa fa-fw fa-envelope" />
                        </Button>
                      ) : (
                        <Button
                          className="mr-2"
                          size="sm"
                          title="Definir como telefone padrâo para sms"
                          color="secondary"
                          onClick={() => handleSmsFlag(contato)}
                          outline
                        >
                          <i className="fa fa-fw fa-envelope" />
                        </Button>
                      )}
                    </td>
                  )}
                  <td className="align-middle text-right">
                    {(_.isNil(contato.podeRemover) || contato.podeRemover) && (
                      <Button
                        outline
                        title="Remover"
                        color="danger"
                        onClick={() => handleRemoverContato(contato)}
                      >
                        <i className="fa fa-fw fa-close" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

Contato.propTypes = {
  fillContatosList: PropTypes.array.isRequired,
  parsedTiposContato: PropTypes.array,
  parsedTiposTelefone: PropTypes.array,
  usesSmsFlag: PropTypes.bool,
};

Contato.defaultProps = {
  parsedTiposContato: null,
  parsedTiposTelefone: null,
  usesSmsFlag: false,
};
