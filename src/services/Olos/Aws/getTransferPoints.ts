import { UraTransferPoints } from "../../../@types/OlosTypes";
import DataMock from "../../../mocks/getTransferPoints.json";
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const getTransferPoints = async (): Promise<UraTransferPoints[]> => {
  if (awsMock) return DataMock;

  const response = await SebraeRoutingAws.get("/ura");
  return response.data;
};

export default getTransferPoints;
