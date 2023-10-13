import { awsMock } from "../../General";

import { SebraeRoutingAws } from "../OlosAPI";

export type updateUF = {
  key: string;
  value: number;
}[];

const updateUf = async (id: number, parans: updateUF) => {
  if (awsMock) return parans;

  const _data = {
    uf_id: id,
    default_values: parans,
  };

  const response = await SebraeRoutingAws.put("/uf", _data);
  return response.data;
};

export default updateUf;
