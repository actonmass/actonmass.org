import axios from "axios";

export function findReps(query) {
  return axios.post("/.netlify/functions/findMyReps", query).then(function (response) {
    return response.data;
  });
}

export function findRepsMock(query) {
  return new Promise(function (resolve, reject) {
    setTimeout(
      () =>
        resolve({
          senator: "ocd-person/6de50ed2-4fe8-4b98-894d-0bc391c876b5",
          representative: "ocd-person/d887e897-63da-48da-b7cb-b5cc3a3a6e2a",
        }),
      2000
    );
  });
}
