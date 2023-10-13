import "./OEye.scss";

import { ReactComponent as EyeOpen } from "../../assets/icons/formOpenEye.svg";
import { ReactComponent as EyeClose } from "../../assets/icons/formCloseEye.svg";

type Props = {
  close: boolean;
  click: (value: boolean) => void;
};

const OEye = (props: Props) => {
  const { close, click } = props;

  return (
    <div className="OEye" onClick={() => click(!close)}>
      {close ? <EyeClose className="Icon" /> : <EyeOpen className="Icon" />}
    </div>
  );
};

export default OEye;
