import React from 'react';
import { conformToMask } from 'react-text-mask';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import cepApi from '~/services/cepApi';

import { Row, Col, FormGroup, Label } from '~/components';

import KamaleonInput from '../KamaleonInput/KamaleonInput';

import { cepMask } from '~/utilities/masks';

export default function Endereco(props) {
  const formMethods = useFormContext();

  const {
    suffix,
    fillCep,
    fillUf,
    fillLocalidade,
    fillLogradouro,
    fillNumero,
    fillBairro,
    fillComplemento,
    fillIbge,
    disabled,
  } = props;

  async function handleCepChange(newCep) {
    let val = newCep.replace(/\D/g, '');

    val = conformToMask(val, cepMask, {
      guide: false,
    }).conformedValue;

    if (val.charAt(val.length - 1).match(/\D/g)) {
      val = val.substring(0, val.length - 1);
    }

    fillCep[1](val);

    const replacedCep = newCep.replace(/\D/g, '');

    if (replacedCep.length === 8) {
      const response = await cepApi.get(`/${replacedCep}/json`);

      const log = response.data.logradouro;
      const comp = response.data.complemento;
      const bai = response.data.bairro;
      const loc = response.data.localidade;
      const uff = response.data.uf;
      const codIbge = response.data.uf;

      if (log) {
        fillLogradouro[1](log);
      }
      if (comp) {
        fillComplemento[1](comp);
      }
      if (bai) {
        fillBairro[1](bai);
      }
      if (loc) {
        fillLocalidade[1](loc);
      }
      if (uff) {
        fillUf[1](uff);
      }
      if (codIbge) {
        fillIbge[1](codIbge);
      }
    } else {
      fillUf[1]('...');
      fillLocalidade[1]('...');
      fillIbge[1]('');
    }
  }

  return (
    <>
      <Row>
        <Col lg={3} sm={12} md={3}>
          <FormGroup>
            <Label for={`cep${suffix ? `_${suffix}` : ''}`}>CEP</Label>
            <KamaleonInput
              type=""
              name={`cep${suffix ? `_${suffix}` : ''}`}
              id={`cep${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillCep[0]}
              onChange={event => handleCepChange(event.target.value)}
              disabled={disabled}
              innerRef={formMethods && formMethods.register({ required: true })}
              invalid={
                formMethods &&
                formMethods.errors[`cep${suffix ? `_${suffix}` : ''}`]
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={3} sm={12}>
          <FormGroup>
            <Label for={`uf${suffix ? `_${suffix}` : ''}`}>Estado</Label>
            <KamaleonInput
              type=""
              name={`uf${suffix ? `_${suffix}` : ''}`}
              id={`uf${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillUf[0]}
              disabled
            />
          </FormGroup>
        </Col>
        <Col lg={9} sm={12}>
          <FormGroup>
            <Label for={`localidade${suffix ? `_${suffix}` : ''}`}>
              Cidade
            </Label>
            <KamaleonInput
              type=""
              name={`localidade${suffix ? `_${suffix}` : ''}`}
              id={`localidade${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillLocalidade[0]}
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={9} sm={12}>
          <FormGroup>
            <Label for={`logradouro${suffix ? `_${suffix}` : ''}`}>
              Logradouro
            </Label>
            <KamaleonInput
              type=""
              name={`logradouro${suffix ? `_${suffix}` : ''}`}
              id={`logradouro${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillLogradouro[0]}
              onChange={event => fillLogradouro[1](event.target.value)}
              disabled={disabled}
              innerRef={formMethods && formMethods.register({ required: true })}
              invalid={
                formMethods &&
                formMethods.errors[`logradouro${suffix ? `_${suffix}` : ''}`]
              }
            />
          </FormGroup>
        </Col>
        <Col lg={3} sm={12}>
          <FormGroup>
            <Label for={`numero${suffix ? `_${suffix}` : ''}`}>Número</Label>
            <KamaleonInput
              type=""
              name={`numero${suffix ? `_${suffix}` : ''}`}
              id={`numero${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillNumero[0]}
              onChange={event => fillNumero[1](event.target.value)}
              disabled={disabled}
              innerRef={formMethods && formMethods.register({ required: true })}
              invalid={
                formMethods &&
                formMethods.errors[`numero${suffix ? `_${suffix}` : ''}`]
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12}>
          <FormGroup>
            <Label for={`bairro${suffix ? `_${suffix}` : ''}`}>Bairro</Label>
            <KamaleonInput
              type=""
              name={`bairro${suffix ? `_${suffix}` : ''}`}
              id={`bairro${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillBairro[0]}
              onChange={event => fillBairro[1](event.target.value)}
              disabled={disabled}
              innerRef={formMethods && formMethods.register({ required: true })}
              invalid={
                formMethods &&
                formMethods.errors[`bairro${suffix ? `_${suffix}` : ''}`]
              }
            />
          </FormGroup>
        </Col>
        <Col lg={6} sm={12}>
          <FormGroup>
            <Label for={`complemento${suffix ? `_${suffix}` : ''}`}>
              Complemento
            </Label>
            <KamaleonInput
              type=""
              name={`complemento${suffix ? `_${suffix}` : ''}`}
              id={`complemento${suffix ? `_${suffix}` : ''}`}
              placeholder=""
              value={fillComplemento[0]}
              onChange={event => fillComplemento[1](event.target.value)}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

Endereco.propTypes = {
  suffix: PropTypes.string,
  fillCep: PropTypes.array.isRequired,
  fillUf: PropTypes.array.isRequired,
  fillLocalidade: PropTypes.array.isRequired,
  fillLogradouro: PropTypes.array.isRequired,
  fillNumero: PropTypes.array.isRequired,
  fillBairro: PropTypes.array.isRequired,
  fillComplemento: PropTypes.array.isRequired,
  fillIbge: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

Endereco.defaultProps = {
  suffix: null,
  disabled: false,
};
