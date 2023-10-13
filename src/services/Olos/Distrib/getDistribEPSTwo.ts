import { mock } from "../../General";
import DataMock from "../../../mocks/getDistribEPS2.json";
import { SebraeRouting } from "../OlosAPI";
import { DistribEPSResponse } from "../../../@types/OlosTypes";

type Params = {
  serviceId: number;
};

const getDistribEPSTwo = async (params: Params): Promise<DistribEPSResponse> => {
  if (mock) return DataMock;
  const response = await SebraeRouting.get(`DistribEPS/${params.serviceId}`);
  return response.data;
};

export default getDistribEPSTwo;
