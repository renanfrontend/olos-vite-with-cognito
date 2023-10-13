import "./OMenuItem.scss";

type Props = {
  label: string;
  activie: boolean;
  click: () => void;
};

const OMenuItem = (props: Props) => {
  const { label, activie, click } = props;

  return (
    <div className={`OMenuItem ${activie ? "OMenuItem--activie" : ""}`} onClick={() => click()}>
      <div className="OMenuItem__Label">{label}</div>
      {activie && <div className="OMenuItem__Rec" />}
    </div>
  );
};

export default OMenuItem;
