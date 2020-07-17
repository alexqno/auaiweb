import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const cepMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];
const cnpjMask = [
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];
const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const cpfCnpjMask = raw => {
  const replacedRaw = raw.replace(/\D/g, '');
  const rawLength = replacedRaw.length;

  if (rawLength < 12) {
    return cpfMask;
  }
  return cnpjMask;
};

const phoneMask = raw => {
  const numbers = raw.match(/\d/g);
  let numberLength = 0;
  if (numbers) {
    numberLength = numbers.join('').length;
  }

  if (numberLength > 10) {
    return [
      '(',
      /[1-9]/,
      /[1-9]/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  }
  return [
    '(',
    /[1-9]/,
    /[1-9]/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
};

const numberMask = createNumberMask({
  prefix: '',
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  allowLeadingZeroes: true,
});

export {
  cepMask,
  cpfMask,
  cnpjMask,
  cpfCnpjMask,
  phoneMask,
  dateMask,
  numberMask,
};
