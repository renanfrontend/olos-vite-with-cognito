import "./OIconButton.scss";

import { ReactComponent as Filter } from "../../assets/icons/filter.svg";
import { ReactComponent as Update } from "../../assets/icons/update.svg";
import { ReactComponent as Search } from "../../assets/icons/searchIcon.svg";

type Props = {
  label?: string;
  icon: "filter" | "update" | "search";
  disable?: boolean;
  onClick?: () => void;
};

const OIconButton = (props: Props) => {
  const { icon, label, disable, onClick } = props;

  const _renderIcon = {
    filter: <Filter className="OIconButton__Icon" />,
    update: <Update className="OIconButton__Icon" />,
    search: <Search className="OIconButton__Icon" />,
  };

  return (
    <div className={`OIconButton ${disable ? "OIconButton--disable" : ""}`} onClick={() => onClick && onClick()}>
      {_renderIcon[icon]}
      {label}
    </div>
  );
};

export default OIconButton;
