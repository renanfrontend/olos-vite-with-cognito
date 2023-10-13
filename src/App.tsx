/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import { OlosCognitoAuthProvider } from "@olostecnologia/olos-cognito-auth";

import { Login } from "./views";

import "./App.scss";
function App() {

const config = {
  client_id: "27feqan4juq7h6pn513jbt594v",
  pool_id: "us-east-2_XagFetm9e",
  scope: [
      "email",
      "openid"
  ],
  "useCognitoPool": true,
  appId: "1hd7h1lssk84q253mpu3kaeu21",
  xApiKey: "3EwVYhMYbLQ0qx9ynESP8nhB0=oZeXfRsy=qRR/-Rw9gt5g6wAICC?mD6r88WxRu",
  tenantId: "eaglle-ad",
  environment: "DEV",
  locale: "pt-BR"
}

  return (
    <>
      <div className="App">
          <OlosCognitoAuthProvider configuration={config}>
            <>
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            </>
          </OlosCognitoAuthProvider>
      </div>
    </>
  );
}

export default App;
