import axios from "axios";
import { TenantProvider } from "../../General";
import { TenantProviderApp } from "../../../@types/OlosLive";
import { getUserTenant } from "../../../utils/User";

export type IOlosCognitoAuth = {
  tenantId: any;
  client_id: any;
  oauth_domain: any;
  pool_id: any;
  region: any;
  scope: any;
  environment: any;
  useCognitoPool: any;
};

const GetTenantProvider = async (): Promise<IOlosCognitoAuth> => {
  const response = await axios.get(TenantProvider, {
    headers: {
      "tenant-id": getUserTenant(),
      "x-api-key": process.env.REACT_APP_API_KEY_SEBRAE || "",
    },
  });

  const data = response.data as TenantProviderApp;
  const app = data.apps.find((app) => app.name === process.env.REACT_APP_NAME);

  return {
    tenantId: getUserTenant(),
    client_id: app?.app_id,
    oauth_domain: data.oauth_domain,
    pool_id: data.pool_id,
    region: data.region,
    scope: app?.scope,
    environment: "PRODUCTION",
    useCognitoPool: data.use_cognito_pool,
  };
};

export default GetTenantProvider;
