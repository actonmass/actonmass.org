import axios from 'axios';

function findReps(query) {
  return axios
    .post(
      '/.netlify/functions/findMyReps',
      query
    )
    .then(function(response) {
      if (!Object.keys(response.data).length) {
        throw new Error("The Open States API couldn't find your legislators.")
      }
      return {
        senator: response.data.senator,
        representative: response.data.representative,
      }
    })
}


export default findReps;
