import { useState } from "react";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeLine } from "../../assets/icons/eyeLine.svg";
import "./OInput.scss";

type Props = {
  label: string;
  type: string;
  value?: string;
  required: boolean;
  onChange: (value: string | any) => void;
};

const OInput = (props: Props) => {
  const { label, type, value, required, onChange } = props;

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="OInput">
      <label className="Input">
        <input
          placeholder={label}
          type={visible ? "text" : type}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
        {type === "password" && (
          <div className="OInput__Icon" onClick={() => setVisible(!visible)}>
            {visible ? <EyeLine /> : <EyeIcon />}
          </div>
        )}
      </label>
    </div>
  );
};

export default OInput;
