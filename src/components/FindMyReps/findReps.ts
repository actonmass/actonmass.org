import axios from "axios";

export type Query = { city: string; streetAddress: string };
export type QueryResult = {
  senator?: Queries.Legislator;
  representative?: Queries.Legislator;
};

export default function findReps(query: Query): Promise<QueryResult> {
  return axios.post("/.netlify/functions/findMyReps", query).then((response) => response.data);
}
