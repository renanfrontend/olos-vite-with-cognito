import { mock } from "../../General";
import DataMock from "../../../mocks/getdistribByServiceIdEpsID.json";
import { SebraeRouting } from "../OlosAPI";

type Params = {
  serviceId: number;
  epsID: number;
};

const getDistribByServiceIdEpsID = async (params: Params) => {
  if (mock) return DataMock;
  return await SebraeRouting.get(`Distrib/${params.serviceId}/${params.epsID}`);
};

export default getDistribByServiceIdEpsID;
