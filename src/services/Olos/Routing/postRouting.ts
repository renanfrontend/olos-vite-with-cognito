import { mock } from "../../General";
import DataMock from "../../../mocks/getRoutingService.json";
import { SebraeRouting } from "../OlosAPI";

type Params = {
  serviceID: number;
  campaignID: number;
  description: string;
};

const postRouting = async (params: Params) => {
  if (mock) return DataMock;
  return await SebraeRouting.post("Routing", params);
};

export default postRouting;
