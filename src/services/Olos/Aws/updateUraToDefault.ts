import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

type Params = {
  ura_id: number;
};

const updateUraToDefault = async (params: Params) => {
  if (awsMock) return console.log(params);

  const response = await SebraeRoutingAws.put("/uf/ura", params);
  return response.data;
};

export default updateUraToDefault;
