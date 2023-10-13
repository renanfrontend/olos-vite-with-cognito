export type Login = {
  login: string;
  password: string;
};

export type Routing = {
  serviceID: number;
  campaignID: number;
  description: string;
};

export type RoutingResponse = {
  success: boolean;
  errorMessage: string | null;
  data: Routing[];
};

export type Distrib = {
  serviceID: number;
  epsid: number;
  transferType: number;
  campaignID: number;
  percentual: number;
  route: string;
  mcdu: string;
  description: string;
  iP_ECS: string;
};

export type DistribResponse = {
  success: boolean;
  errorMessage: string | null;
  data: Distrib[];
};

export type Points = {
  label: string;
  activie: boolean;
  value: string;
  extraValue?: string;
  input: boolean;
};

export type Regional = {
  id: string;
  name: string;
  total?: number;
  generalValue: string;
  transferPoints?: Points[];
  original: Distrib | ConfigAwsValues;
};

export type DistribEPS = {
  dateEvent: string;
  serviceID: number;
  epsID: number;
  descriptionService: string;
  percentualAtual: number;
  percentualAnter: number;
};

export type DistribEPSResponse = {
  success: boolean;
  errorMessage: string | null;
  data: DistribEPS[];
};

export type ConfigAws = {
  id: number;
  values: ConfigAwsValues[];
};

export type ConfigAwsValues = {
  key: string;
  value: number;
};

export type LevelValues = {
  timestamp: string;
  value: any;
  reached?: number;
};

export type ServiceLevelAws = {
  platform: string;
  values: LevelValues[];
};

export type PlatformsAws = {
  platforms: {
    name: string;
  }[];
};

export type Indicator = {
  id: number;
  name: string;
  type: string;
  rule_id: number;
  rule_name: string;
  target: number;
  prompt: string;
  weight: number;
  on_off: number;
  active: number;
  column_name: string;
};

export type UpdateIndicator = {
  id: number;
  name: string;
  type: string;
  rule_id: number;
  target: number;
  prompt: string;
  weight: number;
  on_off: number;
  column_name: string;
};

export type TransferPoint = {
  key: string;
  value: number;
};

export type UF = {
  id: number;
  code: string;
  balance: TransferPoint[];
  default_values: TransferPoint[];
  active: number;
  fixed: number;
  edited?: boolean;
};

export type UraTransferPoints = {
  id: number;
  name: string;
  ufs: UF[];
};

export type Rule = {
  id: number;
  name: string;
  symbol: string;
  active: number;
};

export type UpdateURA = {
  id: number;
  name: string;
  ufs: {
    code: string;
    id?: number;
  }[];
};

export type Kpi = {
  servicelevel: number;
  averagetalkingtime: number;
  averagewaitingtime: number;
  netpromoterscore: number;
  abandonrate: number;
  timestamp: string;
  number_of_calls: number;
};

export type OperationData = {
  platform: string;
  kpis: Kpi[];
};

export type Operation = {
  data: OperationData[];
};
