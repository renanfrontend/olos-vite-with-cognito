
import { awsMock } from "../../General";
import { SebraeRoutingAws } from "../OlosAPI";

const fixUF = async (ura_id: number) => {
//   if (awsMock) return console.info('fixUF', ura_id);

  const response = await SebraeRoutingAws.patch(`/uf/${ura_id}/fix`);
  return response.data;
};

export default fixUF;
