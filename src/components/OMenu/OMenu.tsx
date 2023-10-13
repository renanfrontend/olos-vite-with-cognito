import { Menu } from "../../@types/DataTypes";
import { userHasPermission } from "../../utils/User";

import OMenuItem from "../OMenuItem/OMenuItem";
import "./OMenu.scss";

type Props = {
  menu: Menu[];
  page: string;
  click: (path: string) => void;
};

const OMenu = (props: Props) => {
  const { menu, page, click } = props;

  return (
    <div className="OMenu">
      {menu
        .filter((item) => userHasPermission(item))
        .map((item, index) => {
          return (
            <OMenuItem key={index} label={item.label} activie={page === item.id} click={() => click(`/${item.id}`)} />
          );
        })}
    </div>
  );
};

export default OMenu;
