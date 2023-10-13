import Select, { StylesConfig } from "react-select";
import { ReactSelect } from "../../@types/DataTypes";
import { ReactComponent as Help } from "../../assets/icons/help.svg";

import "./OSelect.scss";

export interface GroupedOption {
  readonly label: string;
  readonly options: ReactSelect[];
}


type Props = {
  label?: string;
  placeholder?: string;
  options: ReactSelect[] | GroupedOption[];
  value?: ReactSelect | ReactSelect[] | null;
  help?: boolean;
  isMulti?: boolean;
  disable?: boolean;
  name?: string;
  loading?: boolean;
  minHeight?: string,
  clearable?: boolean;
  helpClick?: () => void;
  change: (value: ReactSelect | ReactSelect[]) => void;
};

const OSelect = (props: Props) => {
  const { label, options, change, value, help, helpClick, isMulti, placeholder, disable, name, loading, minHeight, clearable } = props;

  const selectStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none",
      minHeight: minHeight || "50px",
      borderWidth: "1px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "18px",
    }),
    input: (provided) => ({
      ...provided,
      fontSize: "18px",
    }),
  };

  return (
    <div className={`OSelect ${disable ? "OSelect--Disable" : ""} ${name || ""} ${loading ? "loading-input" : ""}`}>
      {label && (
        <div className="OSelect__Label">
          <span>{label}</span>
          {help && <Help className="OSelect__Help" onClick={() => helpClick && helpClick()} />}
        </div>
      )}
      <Select
        value={value || null}
        placeholder={placeholder || "Selecione"}
        options={options}
        styles={selectStyles}
        onChange={(opt) => change(opt as ReactSelect)}
        noOptionsMessage={() => <>Dados não encontrados</>}
        isClearable={clearable}
        isMulti={isMulti}
        isDisabled={disable}
      />
    </div>
  );
};

export default OSelect;
