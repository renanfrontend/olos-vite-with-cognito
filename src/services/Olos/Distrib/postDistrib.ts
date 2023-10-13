import { mock } from "../../General";
import { SebraeRouting } from "../OlosAPI";
import { Distrib } from "../../../@types/OlosTypes";

const postDistrib = async (params: Distrib) => {
  if (mock) return null;
  return await SebraeRouting.post("Distrib", params);
};

export default postDistrib;
