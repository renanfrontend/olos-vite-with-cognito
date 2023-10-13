import { awsMock } from "../../General";
import DataMock from "../../../mocks/getUras.json";
import { SebraeRoutingAws } from "../OlosAPI";
import {  UraTransferPoints } from "../../../@types/OlosTypes";

const getUras = async (): Promise<UraTransferPoints[]> => {
  if (awsMock) return DataMock;

  const response = await SebraeRoutingAws.get("/ura");
  return response.data;
};

export default getUras;
