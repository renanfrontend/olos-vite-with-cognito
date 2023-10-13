import { awsMock } from "../../General";

import { SebraeRoutingAws } from "../OlosAPI";

export type InsertURA = {
  name: string;
  ufs: {
    code: string;
  }[];
};

const insertUra = async (parans: InsertURA) => {
  if (awsMock) return parans;

  const response = await SebraeRoutingAws.post("/ura", parans);
  return response.data;
};

export default insertUra;
