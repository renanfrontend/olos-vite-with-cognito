import { mock } from "../../General";
import DataMock from "../../../mocks/getRouting.json";
import { SebraeRouting } from "../OlosAPI";
import { RoutingResponse } from "../../../@types/OlosTypes";

const getRouting = async (): Promise<RoutingResponse> => {
  if (mock) return DataMock;
  const response = await SebraeRouting.get("Routing");
  return response.data;
};

export default getRouting;
