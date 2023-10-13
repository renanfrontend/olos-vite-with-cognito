export type TenantApp = {
  name: string;
  scope: string[];
  app_id: string;
  providers: string[];
};

export type TenantProviderApp = {
  apps: TenantApp[];
  region: string;
  pool_id: string;
  oauth_domain: string;
  use_cognito_pool: boolean;
  use_username_login: boolean;
};
