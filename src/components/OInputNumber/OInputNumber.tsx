import Mask from "@this-empathy/javascript-mask";

import "./OInputNumber.scss";

type Props = {
  label: string;
  value: number;
  placeholder?: string;
  complement?: string;
  onChange: (value: string) => void;
  onPlus?: (value: number) => void;
  onMinus?: (value: number) => void;
};

const OInputNumber = (props: Props) => {
  const { label, value, placeholder, complement, onChange, onPlus, onMinus } = props;

  return (
    <div className="OInputNumber">
      <label className="OInputNumber__Label">{label}</label>
      <div className="OInputNumber__Input">
        <div className="OInputNumber__Value">
          <input
            placeholder={placeholder || ""}
            type="text"
            value={value}
            onChange={(event) => onChange(Mask.number(event.target.value))}
            style={{ width: value.toString().length ? `${value.toString().length}ch` : "auto" }}
          />
          {complement && value ? <span className="OInputNumber__Complement">{complement}</span> : ""}
        </div>
        <div className="OInputNumber__Controllers">
          <div className="OInputNumber__Plus" onClick={() => onPlus && onPlus(value)}>
            +
          </div>
          <div className="OInputNumber__Minus" onClick={() => onMinus && onMinus(value)}>
            -
          </div>
        </div>
      </div>
    </div>
  );
};

export default OInputNumber;
