import "./OToogle.scss";

type Props = {
  id: string;
  status: boolean;
  label?: string;
  disable?: boolean;
  change?: (value: boolean) => void;
};

const OToogle = (props: Props) => {
  const { status, label, id, disable, change } = props;

  return (
    <div className={`OToogle ${change ? "OToogle--Change" : ""}  ${disable ? "OToogle--disable" : ""}`}>
      {label && (
        <label className="OToogle__Label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type="checkbox"
        checked={status}
        id={id}
        onChange={() => change && change(!status)}
      />
    </div>
  );
};

export default OToogle;
