import { awsMock } from "../../General";
import DataMock from "../../../mocks/getServiceLevel.json";
import { SebraeRoutingAws } from "../OlosAPI";
import { PlatformsAws, ServiceLevelAws } from "../../../@types/OlosTypes";

const getServiceLevel = async (params: PlatformsAws): Promise<ServiceLevelAws[]> => {
  if (awsMock) return DataMock;
  const response = await SebraeRoutingAws.post("servicelevel", params);
  return response.data;
};

export default getServiceLevel;
