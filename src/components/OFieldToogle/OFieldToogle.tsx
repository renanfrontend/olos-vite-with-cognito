import OToogle from "../OToogle/OToogle";
import "./OFieldToogle.scss";

type Props = {
  value: string;
  status: boolean;
  change: () => void;
};

const OFieldToogle = (props: Props) => {
  const { value, status, change } = props;

  return (
    <div className={`OFieldToogle ${!status ? "OFieldToogle--disable" : ""}`} onClick={() => change()}>
      <div className="OFieldToogle__Value">{value}</div>
      <OToogle id={value} status={status} />
    </div>
  );
};

export default OFieldToogle;
