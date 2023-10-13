import { Indicator } from "../../../@types/OlosTypes";
import DataMock from "../../../mocks/getIndicators.json";
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const getIndicators = async (): Promise<Indicator[]> => {
  if (awsMock) return DataMock;

  const response = await SebraeRoutingAws.get("/kpi");
  return response.data;
};

export default getIndicators;
