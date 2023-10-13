export const NorthRegion = [
  {
    value: "AC",
    label: "Acre (AC)",
    data: {
      name: "Acre",
      acronym: "AC",
      region: "Região Norte",
    },
  },
  {
    value: "AP",
    label: "Amapá (AP)",
    data: {
      name: "Amapá",
      acronym: "AP",
      region: "Região Norte",
    },
  },
  {
    value: "AM",
    label: "Amazonas (AM)",
    data: {
      name: "Amazonas",
      acronym: "AM",
      region: "Região Norte",
    },
  },
  {
    value: "PA",
    label: "Pará (PA)",
    data: {
      name: "Pará",
      acronym: "PA",
      region: "Região Norte",
    },
  },
  {
    value: "RO",
    label: "Rondônia (RO)",
    data: {
      name: "Rondônia",
      acronym: "RO",
      region: "Região Norte",
    },
  },
  {
    value: "RR",
    label: "Roraima (RR)",
    data: {
      name: "Roraima",
      acronym: "RR",
      region: "Região Norte",
    },
  },
  {
    value: "TO",
    label: "Tocantins (TO)",
    data: {
      name: "Tocantins",
      acronym: "TO",
      region: "Região Norte",
    },
  },
];

export const NortheastRegion = [
  {
    value: "AL",
    label: "Alagoas (AL)",
    data: {
      name: "Alagoas",
      acronym: "AL",
      region: "Região Nordeste",
    },
  },
  {
    value: "BA",
    label: "Bahia (BA)",
    data: {
      name: "Bahia",
      acronym: "BA",
      region: "Região Nordeste",
    },
  },
  {
    value: "CE",
    label: "Ceará (CE)",
    data: {
      name: "Ceará",
      acronym: "CE",
      region: "Região Nordeste",
    },
  },
  {
    value: "MA",
    label: "Maranhão (MA)",
    data: {
      name: "Maranhão",
      acronym: "MA",
      region: "Região Nordeste",
    },
  },
  {
    value: "PB",
    label: "Paraíba (PB)",
    data: {
      name: "Paraíba",
      acronym: "PB",
      region: "Região Nordeste",
    },
  },
  {
    value: "PE",
    label: "Pernambuco (PE)",
    data: {
      name: "Pernambuco",
      acronym: "PE",
      region: "Região Nordeste",
    },
  },
  {
    value: "PI",
    label: "Piauí (PI)",
    data: {
      name: "Piauí",
      acronym: "PI",
      region: "Região Nordeste",
    },
  },
  {
    value: "RN",
    label: "Rio Grande do Norte (RN)",
    data: {
      name: "Rio Grande do Norte",
      acronym: "RN",
      region: "Região Nordeste",
    },
  },
  {
    value: "SE",
    label: "Sergipe (SE)",
    data: {
      name: "Sergipe",
      acronym: "SE",
      region: "Região Nordeste",
    },
  },
];

export const MidwestRegion = [
  {
    value: "DF",
    label: "Distrito Federal (DF)",
    data: {
      name: "Distrito Federal",
      acronym: "DF",
      region: "Região Centro-Oeste",
    },
  },
  {
    value: "GO",
    label: "Goiás (GO)",
    data: {
      name: "Goiás",
      acronym: "GO",
      region: "Região Centro-Oeste",
    },
  },
  {
    value: "MT",
    label: "Mato Grosso (MT)",
    data: {
      name: "Mato Grosso",
      acronym: "MT",
      region: "Região Centro-Oeste",
    },
  },
  {
    value: "MS",
    label: "Mato Grosso do Sul (MS)",
    data: {
      name: "Mato Grosso do Sul",
      acronym: "MS",
      region: "Região Centro-Oeste",
    },
  },
];

export const SouthastRegion = [
  {
    value: "ES",
    label: "Espírito Santo (ES)",
    data: {
      name: "Espírito Santo",
      acronym: "ES",
      region: "Região Sudeste",
    },
  },
  {
    value: "MG",
    label: "Minas Gerais (MG)",
    data: {
      name: "Minas Gerais",
      acronym: "MG",
      region: "Região Sudeste",
    },
  },
  {
    value: "RJ",
    label: "Rio de Janeiro (RJ)",
    data: {
      name: "Rio de Janeiro",
      acronym: "RJ",
      region: "Região Sudeste",
    },
  },
  {
    value: "SP",
    label: "São Paulo (SP)",
    data: {
      name: "São Paulo",
      acronym: "SP",
      region: "Região Sudeste",
    },
  },
];

export const SouthRegion = [
  {
    value: "PR",
    label: "Paraná (PR)",
    data: {
      name: "Paraná",
      acronym: "PR",
      region: "Região Sul",
    },
  },

  {
    value: "RS",
    label: "Rio Grande do Sul (RS)",
    data: {
      name: "Rio Grande do Sul",
      acronym: "RS",
      region: "Região Sul",
    },
  },

  {
    value: "SC",
    label: "Santa Catarina (SC)",
    data: {
      name: "Santa Catarina",
      acronym: "SC",
      region: "Região Sul",
    },
  },
];

export const UFS = [...NorthRegion, ...NortheastRegion, ...MidwestRegion, ...SouthastRegion, ...SouthRegion];

export const GroupedUFS = [
  {
    label: "Região Norte",
    options: NorthRegion,
  },
  {
    label: "Região Nordeste",
    options: NortheastRegion,
  },
  {
    label: "Região Centro-Oeste",
    options: MidwestRegion,
  },
  {
    label: "Região Sudeste",
    options: SouthastRegion,
  },
  {
    label: "Região Sul",
    options: SouthRegion,
  },
];
