import "./OCheckbox.scss";

type Props = {
  onChange: ({ activie, value }: { activie: boolean; value?: string }) => void;
  label: string;
  value: string;
  checked: boolean;
  textTransform?: "capitalize" | "lowercase" | "uppercase";
  inputText?: boolean;
  inputTextValue?: string;
  inputTextChange?: ({ extraValue }: { extraValue?: string }) => void;
};

const OCheckbox = (props: Props) => {
  const { value, label, onChange, checked, textTransform, inputText, inputTextValue, inputTextChange } = props;

  const transformText = {
    capitalize: (value: string) => value.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
    lowercase: (value: string) => value.toLowerCase(),
    uppercase: (value: string) => value.toUpperCase(),
  };

  return (
    <div className="OCheckbox">
      <label className="container">
        <div className="label">{transformText[textTransform || "capitalize"](label)}</div>
        <input
          type="checkbox"
          checked={checked}
          value={value}
          onChange={() => {
            onChange({ activie: !checked, value });
          }}
        />
        <span className="checkmark"></span>
      </label>
      {inputText && (
        <input
          className={`OCheckbox__InputText ${
            checked ? "OCheckbox__InputText--enable" : "OCheckbox__InputText--disable"
          }`}
          value={inputTextValue}
          type="text"
          onChange={(event) => {
            inputTextChange && inputTextChange({ extraValue: event.target.value });
          }}
        />
      )}
    </div>
  );
};

export default OCheckbox;
