export const mock = true;
export const awsMock = false;

const { WEB_API_SEBRAE_ROUTING_CAMPAIGN, WEB_API_SEBRAE_ROUTING_AWS, API_TENANT_PROVIDER } = (window as any).config;


export const TenantProvider = API_TENANT_PROVIDER;
export const WebApiSebraeRouting = WEB_API_SEBRAE_ROUTING_CAMPAIGN;
export const WebApiSebraeAws = WEB_API_SEBRAE_ROUTING_AWS;
