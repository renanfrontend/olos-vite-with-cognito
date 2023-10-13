import { awsMock } from "../../General";
import DataMock from "../../../mocks/getUras.json";
import { SebraeRoutingAws } from "../OlosAPI";
import { UpdateURA } from "../../../@types/OlosTypes";

const updateUra = async (params: UpdateURA) => {
  if (awsMock) return DataMock;

//   const response = await SebraeRoutingAws.put("/ura");
//   return response.data;
};

export default updateUra;
