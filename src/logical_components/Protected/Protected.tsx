import { Navigate, useLocation } from "react-router-dom";
import { userHasPermission } from "../../utils/User";
import Menu from "../../data/Menu.json";

type Props = {
  children: JSX.Element;
};

const Protected = (props: Props) => {
  const { children } = props;
  const location = useLocation();

  const _getAuthorization = (): boolean => {
    const _menu = Menu.find((item) => item.id === location.pathname.replace("/", ""));
    if (!_menu) return false;

    return userHasPermission(_menu);
  };

  if (!_getAuthorization()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
