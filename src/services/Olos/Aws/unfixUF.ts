
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const unfixUF = async (ura_id: number) => {
//   if (awsMock) return console.info('unfixUF', ura_id);

  const response = await SebraeRoutingAws.patch(`/uf/${ura_id}/unfix`);
  return response.data;
};

export default unfixUF;
