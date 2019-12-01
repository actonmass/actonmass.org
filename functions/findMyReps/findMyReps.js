import axios from 'axios';
import geoLocate from './geoLocate';

const { OPEN_STATES_API_KEY } = process.env;

const API_ENDPOINT = 'https://openstates.org/graphql';


const query = `
query getLocalLegislators($latitude: Float, $longitude: Float) {
  senator: people(latitude: $latitude, longitude: $longitude, memberOf: "ocd-organization/1a75ab3a-669b-43fe-ac8d-31a2d6923d9a", first: 1) {
    edges {
      node {
        id
        name
      }
    }
  }
  representative: people(latitude: $latitude, longitude: $longitude, memberOf: "ocd-organization/ca38ad9c-c3d5-4c4f-bc2f-d885218ed802", first: 1) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`

exports.handler = async (event, context) => {
    const query = JSON.parse(event.body);

    return geolocate(query).then((location) => {
      return axios.post(
        API_ENDPOINT,
        {
          query,
          variables: {
            latitude: location.lat,
            longitude: location.lon,
          },
        },
        {
          headers: {
            'X-API-KEY': OPEN_STATES_API_KEY,
          },
        }
      )
      .then(response => response.json())
      .then((data) => ({
          statusCode: 200,
          body: JSON.stringify({
            senator: response.data.data.senator.edges[0].node,
            representative: response.data.data.representative.edges[0].node,
          })
      }))
      .catch(error => ({statusCode: 400, body: String(error)}));
    });
}


