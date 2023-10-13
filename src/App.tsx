/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import { OlosCognitoAuthProvider } from "@olostecnologia/olos-cognito-auth";

import { Login } from "./views";

import "./App.scss";
function App() {

const config = {
  "appId": "36ik68tol9p81pf1mho9r4538o",
  "xApiKey": "3EwVYhMYbLQ0qx9ynESP8nhB0=oZeXfRsy=qRR/-Rw9gt5g6wAICC?mD6r88WxRu",
  "tenantId": "eaglle",
  "environment": "DEV"
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
