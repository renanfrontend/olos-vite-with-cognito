import { mock } from "../../General";
import DataMock from "../../../mocks/getDistrib.json";
import { SebraeRouting } from "../OlosAPI";
import { DistribResponse } from "../../../@types/OlosTypes";

type Params = {
  serviceId: number;
};

const getDistribByServiceId = async (params: Params): Promise<DistribResponse> => {
  if (mock) return DataMock;
  const response = await SebraeRouting.get(`Distrib/${params.serviceId}`);
  return response.data;
};

export default getDistribByServiceId;
