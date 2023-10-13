import { SebraeRoutingAws } from "../OlosAPI";
import { UpdateIndicator } from "../../../@types/OlosTypes";
import { awsMock } from "../../General";

const updateIndicators = async (params: UpdateIndicator) => {
  if (awsMock) return console.info("updateIndicators", params);

  const response = await SebraeRoutingAws.put("/kpi", params);
  return response.data;
};

export default updateIndicators;
