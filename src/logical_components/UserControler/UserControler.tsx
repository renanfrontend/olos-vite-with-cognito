import { useCognitoAuthEvents, CognitoAuthEvents } from "@olostecnologia/olos-cognito-auth";
import { useNavigate } from "react-router-dom";

type Props = {};

const UserControler = (props: Props) => {
  const navigate = useNavigate();

  useCognitoAuthEvents((response: any) => {
    const { event, data } = response;

    switch (event) {
      case CognitoAuthEvents.SIGN_IN:
        sessionStorage.setItem("token", JSON.stringify(data.olosToken));
        navigate("/inicio");
        break;

      case CognitoAuthEvents.SIGN_OUT:
        sessionStorage.removeItem("token");
        navigate("/");
        break;

      case CognitoAuthEvents.TOKEN_REFRESH:
        sessionStorage.removeItem("token");
        navigate("/");
        break;
    }
  });

  return <div style={{ position: "absolute", top: "99999999px" }}></div>;
};

export default UserControler;
