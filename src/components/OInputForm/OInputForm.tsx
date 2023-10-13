import "./OInputForm.scss";

type Props = {
  name?: string;
  label?: string;
  value: string | number;
  placeholder?: string;
  link?: string;
  maxLength?: number;
  order?: number;
  disable?: boolean;
  onLinkClick?: () => void;
  onChange?: (value: string) => void;
};

const OInputForm = (props: Props) => {
  const { name, label, value, placeholder, onChange, link, onLinkClick, maxLength, order, disable } = props;

  return (
    <div className={`OInputForm ${!onChange ? "OInputForm--disable" : ""} ${disable ? "OInputForm--disable" : ""} ${name || ""}`}>
      {label && <label className="OInputForm__Label">{label}</label>}
      <input
        className="OInputForm__Input"
        maxLength={maxLength}
        placeholder={placeholder || ""}
        type="text"
        tabIndex={order}
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
      {link && (
        <span className="OInputForm__Link" onClick={() => onLinkClick && onLinkClick()}>
          {link}
        </span>
      )}
    </div>
  );
};

export default OInputForm;
