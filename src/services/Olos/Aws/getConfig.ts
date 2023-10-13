import { awsMock } from "../../General";
import DataMock from "../../../mocks/getConfig.json";
import { SebraeRoutingAws } from "../OlosAPI";
import { ConfigAws } from "../../../@types/OlosTypes";

const getConfig = async (): Promise<ConfigAws> => {
  if (awsMock) return DataMock;

  const response = await SebraeRoutingAws.get("/default");
  return response.data;
};

export default getConfig;
