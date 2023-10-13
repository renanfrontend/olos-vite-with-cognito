export type Menu = {
  label: string;
  id: string;
  authorized: string;
};

export type ReactSelect = { value: string; label: string; child?: ReactSelect[]; data?: any };

export type Checkbox = {
  label: string;
  activie: boolean;
  value: string;
  input?: boolean;
  extraValue?: string;
};
