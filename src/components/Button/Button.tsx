import "./button.scss";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  theme?: "Orange" | "Border";
  onClick?: () => void;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button = (props: Props) => {
  const { title, type, onClick, label, disabled, theme, loading } = props;

  return (
    <button
      title={title}
      className={`Button Button--${theme || "Orange"} ${loading ? "Button--loading" : ""}`}
      type={type || "button"}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {loading ? "Carregando" : label}
    </button>
  );
};

export default Button;
