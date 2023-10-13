import { Rule } from "../../../@types/OlosTypes";
import DataMock from "../../../mocks/getRules.json";
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const getRules = async (): Promise<Rule[]> => {
  if (awsMock) return DataMock;

  const response = await SebraeRoutingAws.get("/rule");
  return response.data;
};

export default getRules;
