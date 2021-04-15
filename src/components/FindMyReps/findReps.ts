import axios from "axios";

import { LegBase } from "../../types";

export type Query = { city: string; streetAddress: string };
export type QueryResult = {
  senator?: LegBase;
  representative?: LegBase;
};

export default function findReps(query: Query): Promise<QueryResult> {
  return axios.post("/.netlify/functions/findMyReps", query).then((response) => response.data);
}
