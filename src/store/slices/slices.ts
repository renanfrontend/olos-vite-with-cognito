import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactSelect } from "../../@types/DataTypes";
import { ConfigAws, Rule } from "../../@types/OlosTypes";

export interface ConfigState {
  apiError: string | null;
  configs: ConfigAws | undefined;
  rules: Rule[],
  uras: ReactSelect[];
}

const initialState: ConfigState = {
  rules: [],
  apiError: null,
  configs: undefined,
  uras: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setApiError: (state, action: PayloadAction<string>) => void (state.apiError = action.payload),
    setUras: (state, action: PayloadAction<ReactSelect[]>) => void (state.uras = action.payload),
    setConfigs: (state, action: PayloadAction<ConfigAws>) => void (state.configs = action.payload),
    setRules: (state, action: PayloadAction<Rule[]>) => void (state.rules = action.payload),
  },
});

export const { setApiError, setUras, setConfigs, setRules } = configSlice.actions;
export default configSlice.reducer;
