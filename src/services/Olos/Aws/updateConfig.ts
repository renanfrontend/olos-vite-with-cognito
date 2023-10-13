import { ConfigAws } from "../../../@types/OlosTypes";
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const updateConfig = async (params: ConfigAws) => {
  if (awsMock) return console.info('updateConfig', params);

  const response = await SebraeRoutingAws.put("/default", params);
  return response.data;
};

export default updateConfig;
