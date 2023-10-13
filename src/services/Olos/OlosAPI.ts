import axios from "axios";
import { WebApiSebraeRouting, WebApiSebraeAws } from "../General";
import { getUserTenant } from "../../utils/User";

export const SebraeRouting = axios.create({
  baseURL: WebApiSebraeRouting,
  headers: {
    ApiKeySebrae: process.env.REACT_APP_API_KEY_SEBRAE || "",
  },
});

export const SebraeRoutingAws = axios.create({
  baseURL: WebApiSebraeAws,
  headers: {
    "tenant-id": getUserTenant(),
  },
});

const _getAuthorization = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return "";

  const authorization = JSON.parse(token);
  return `Bearer ${authorization.access_token}`;
};

SebraeRoutingAws.interceptors.request.use(async (config) => {
  const authorization = _getAuthorization();

  config.headers = {
    ...(config.headers || {}),
    Authorization: authorization,
  };

  return config;
});
