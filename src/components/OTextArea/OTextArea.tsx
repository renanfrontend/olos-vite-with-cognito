import "./OTextArea.scss";

type Props = {
  id: string;
  label: string;
  value: string;
  rows?: number;
  maxLength?: number;
  onChange: (value: string) => void;
};

const OTextArea = (props: Props) => {
  const { id, label, value, rows, maxLength, onChange } = props;
  return (
    <div className="OTextArea">
      <label htmlFor={id}>{label}</label>
      <textarea
        maxLength={maxLength}
        id={id}
        value={value}
        rows={rows || 5}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="OTextArea__Length">Caractere(s) {value?.length || 0}</span>
    </div>
  );
};

export default OTextArea;
