import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

import "./OAcordeon.scss";

type Props = {
  id: number;
  name: string;
  open: boolean;
  disable?: boolean;
  message?: string;
  onClick?: (id: number) => void;
  children?: JSX.Element;
};

const OAcordeon = (props: Props) => {
  const { id, name, open, children, disable, message, onClick } = props;

  return (
    <div className={`OAcordeon ${!disable ? "OAcordeon--disable" : ""}`}>
      <div
        className={`OAcordeon__Header OAcordeon__Header${open ? "--open" : "--close"}`}
        onClick={() => onClick && onClick(id)}
      >
        <div className="OAcordeon__Name">
          <span>{name}</span>
          {message && <span className="OAcordeon__Message"> ({message})</span>}
        </div>
        <Arrow className={`OAcordeon__Arrow OAcordeon__Arrow${open ? "--open" : "--close"}`} />
      </div>
      <div className={`OAcordeon__Content OAcordeon__Content${open ? "--open" : "--close"}`}>
        <div className="OAcordeon__Wrapper">{children}</div>
      </div>
    </div>
  );
};

export default OAcordeon;
