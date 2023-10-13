import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { ReactComponent as Filter } from "../../assets/icons/filter.svg";

import "./ODrop.scss";

type Props = {
  label: string;
  icon?: "filter";
  disable?: boolean;
  open?: boolean;
  children: JSX.Element;
  floatContainer?: boolean;
  clickDisable?: () => void;
  click?: () => void;
};

const ODrop = (props: Props) => {
  const { click, icon, label, disable, children, open, floatContainer, clickDisable } = props;

  const _renderIcon = {
    filter: <Filter className="ODrop__Icon" />,
  };

  return (
    <div className={`ODrop ${disable ? "ODrop--disable" : ""}`}>
      <div
        className="ODrop__Button"
        onClick={() => {
          if (disable) return clickDisable && clickDisable();
          if (!disable) return click && click();
        }}
      >
        {icon && _renderIcon[icon]}
        <span>{label}</span>
        <Arrow className="ODrop__Arrow" />
      </div>
      <div
        className={`ODrop__Content ${open ? "ODrop__Content--open" : ""} ${
          floatContainer ? "ODrop__Content--float" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ODrop;
