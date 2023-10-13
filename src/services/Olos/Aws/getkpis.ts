import { Operation } from "../../../@types/OlosTypes";
import DataMock from "../../../mocks/getKpis.json";
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const getKpis = async (date: string): Promise<Operation> => {
  if (awsMock) return DataMock;

  const response = await SebraeRoutingAws.get(`/operation/kpis?date=${date}`);
  return response.data;
};

export default getKpis;
