import { AxiosError } from "axios";
import "./OError.scss";

type Props = {
  error?: AxiosError;
};

const OError = (props: Props) => {
  const { error } = props;

  return (
    <div className="OError">
      <h2>Ops! Ocorreu um Erro</h2>
      <ul>
        <li>Mensagem: {error?.message}</li>
        <li>
          Status: {error?.code || ""} :: {error?.response?.statusText}
        </li>
        <li>URL: {error?.config.url || ""}</li>
      </ul>
    </div>
  );
};

export default OError;
