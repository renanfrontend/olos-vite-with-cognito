import { mock } from "../../General";
import DataMock from "../../../mocks/getDistrib.json";
import { SebraeRouting } from "../OlosAPI";

const getDistrib = async () => {
  if (mock) return DataMock;
  return await SebraeRouting.get("Distrib");
};

export default getDistrib;
