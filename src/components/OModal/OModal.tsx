import { ReactComponent as Close } from "../../assets/icons/closeIcon.svg";
import { ReactComponent as Info } from "../../assets/icons/info.svg";

import "./OModal.scss";

type Props = {
  title?: string;
  text?: string;
  name?: string;
  removeInfo?: boolean;
  children?: JSX.Element;
  errorModal?: boolean;
  onClose: () => void;
};

const OModal = (props: Props) => {
  const { title, text, onClose, children, name, removeInfo, errorModal } = props;

  return (
    <div className={`OModal ${name || ""}`}>
      <div className="OModal__Container">
        <Close className="OModal__Close" onClick={() => onClose()} />
        {!removeInfo && <Info className={`OModal__Info ${errorModal ? "OModal__Info--erro" : ""}`} />}
        {title && <h1>{title}</h1>}
        {text && <p>{text}</p>}
        {children && <div className="OModal__Children">{children}</div>}
      </div>
    </div>
  );
};

export default OModal;
