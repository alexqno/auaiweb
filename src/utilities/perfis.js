const perfis = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'D',
    label: 'D',
  },
  {
    value: 'E',
    label: 'E',
  },
  {
    value: 'F',
    label: 'F',
  },
  {
    value: 'NAO_INFORMADO',
    label: 'Não informado',
  },
];

const perfilDescricao = perfil => {
  const perf = perfis.find(pf => pf.value === perfil);

  if (perf) {
    return perf.label;
  }

  return `*** ${perfil} ***`;
};

export { perfis, perfilDescricao };
