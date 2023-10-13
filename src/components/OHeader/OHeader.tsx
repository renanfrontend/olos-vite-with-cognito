import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoOlos } from "../../assets/logo.svg";

import "./OHeader.scss";

type Props = {
  logout?: boolean;
  logoutClick?: () => void;
};

const OHeader = (props: Props) => {
  const navigate = useNavigate();
  const { name } = (window as any).content;

  const { logout, logoutClick } = props;

  const _logout = () => {
    logoutClick && logoutClick();
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="Header">
      <div className="Header__Logo">
        <LogoOlos className="Header__Olos" />
        <h1 dangerouslySetInnerHTML={{__html: name}} />
          
      </div>
      <div className="Header__Menu">
        <ul>{logout && <li onClick={() => _logout()}>Sair</li>}</ul>
      </div>
    </header>
  );
};

export default OHeader;
