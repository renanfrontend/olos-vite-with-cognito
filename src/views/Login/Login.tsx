import { OlosCognitoAuthForm } from "@olostecnologia/olos-cognito-auth";

import { ReactComponent as LogoOlos } from "../../assets/logo.svg";

import "./login.scss";

export const Login = () => {
  const { name } = (window as any).content;

  return (
    <section className="Login">
      <div className="Login__Box">
        <h1 dangerouslySetInnerHTML={{ __html: name }} />
        <OlosCognitoAuthForm />
        <div className="Login__LogoBox">
          <LogoOlos />
        </div>
      </div>
    </section>
  );
};
