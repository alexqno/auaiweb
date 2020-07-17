import { conformToMask } from 'react-text-mask';
import { phoneMask } from './masks';

const defaultPhoneTypes = [
  'TELEFONE_RESIDENCIAL',
  'TELEFONE_COMERCIAL',
  'TELEFONE_CELULAR',
  'WHATSAPP',
];

const conformContatoValor = (valueType, value, phoneTypes) => {
  if (!phoneTypes) {
    phoneTypes = defaultPhoneTypes;
  }

  if (phoneTypes.includes(valueType) && value.length >= 10) {
    return conformToMask(value, phoneMask(value)).conformedValue;
  }

  return value;
};

const tipoContatoDescricao = (tipoContato, tiposContato) => {
  const tipo = tiposContato.find(tc => tc.value === tipoContato);

  if (tipo) {
    return tipo.label;
  }

  return `*** ${tipoContato} ***`;
};

export { defaultPhoneTypes, conformContatoValor, tipoContatoDescricao };
