import axios from "axios";

// Switch to false to actually fetch leg data in dev
// This requires to run the netlify function
const shouldMockInDev = true;

export type Query = { city: string; streetAddress: string };
export type QueryResult = {
  senator: string;
  representative: string;
};

function findRepsProd(query: Query): Promise<QueryResult> {
  return axios.post("/.netlify/functions/findMyReps", query).then(function (response) {
    return response.data;
  });
}

function findRepsMock(query: Query): Promise<QueryResult> {
  return new Promise(function (resolve) {
    setTimeout(
      () =>
        resolve({
          senator: "ocd-person/6de50ed2-4fe8-4b98-894d-0bc391c876b5",
          representative: "ocd-person/a8225754-d88c-4343-8829-aa168b564cbd",
        }),
      2000
    );
  });
}

export default function findReps(query: Query): Promise<QueryResult> {
  const isDev = window.location.host.startsWith("localhost");
  const shouldMock = isDev && shouldMockInDev;
  if (shouldMock) {
    return findRepsMock(query);
  }
  return findRepsProd(query);
}
