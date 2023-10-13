import jwt_decode from "jwt-decode";
import { Menu } from "../@types/DataTypes";

type JwtDecode = {
  sub: string;
  username: string;
  tid: string;
  iss: string;
  roles: string[];
  iat: number;
  exp: number;
};

type UserType = "olos" | "cognito";

export const getUserType = (): UserType => {
  if (process.env.NODE_ENV === "development" || window.location.origin.includes("10.15.10.38")) return "olos";
  return "cognito";
};

export const permissions = {
  olos: ["olos", "supervisor", "agent"],
  supervisor: ["supervisor", "agent"],
  agent: ["agent"],
};

export const getOlosUser = (): JwtDecode | undefined => {
  const _token = sessionStorage.getItem("token");
  if (!_token) return undefined;

  if (getUserType() === "olos")
    return {
      sub: "",
      username: "Admin",
      tid: "local",
      iss: "",
      roles: ["olos"],
      iat: 0,
      exp: 0,
    };

  try {
    const _parsedToken = JSON.parse(_token);
    const user: JwtDecode = jwt_decode(_parsedToken.access_token);

    return user;
  } catch (error) {
    return undefined;
  }
};

export const isUserAgent = (): boolean => {
  const _token = sessionStorage.getItem("token");
  if (!_token) return false;

  if (getUserType() === "olos") return false;

  try {
    const _parsedToken = JSON.parse(_token);
    const user: JwtDecode = jwt_decode(_parsedToken.access_token);

    return user.roles.length === 1 && user.roles[0] === "agent";
  } catch (error) {
    return false;
  }
};

export const userHasPermission = (_menu: Menu) => {
  const _user = getOlosUser();
  if (!_user) return false;

  let permission = "";

  _user.roles.forEach((role) => {
    if (permissions[role as string as keyof typeof permissions].includes(_menu.authorized)) {
      permission = role;
    }
  });

  return !!permission;
};

export const getUserTenant = (): string => {
  if (process.env.NODE_ENV === "development") return process.env.REACT_APP_TENANT_ID || "acme";

  const regex = /([^-]+)/;
  const host = window.location.host;

  return getUserType() === "olos" ? "acme" : regex.exec(host)?.[0] || "acme";
};
