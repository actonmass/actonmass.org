const axios = require('axios');

const { OPEN_STATES_API_KEY } = process.env;


function geolocate(address) {
    return new Promise((resolve, reject) => {
        resolve({
            lat: "42.363969",
            lon: "-71.113575",
        });
    });
  // return axios
  //   .get('https://maps.googleapis.com/maps/api/geocode/json', {
  //     params: {
  //       address: address,
  //       key: functions.config().keys.google_api_key,
  //     },
  //   })
  //   .then(function(response) {
  //     if (response.data.results.length) {
  //       return response.data.results[0].geometry.location
  //     } else {
  //       // couldn't geolocate the address
  //       throw new Error(
  //         JSON.stringify({
  //           name: "Couldn't locate that Massachusetts address.",
  //           data: response.data,
  //         })
  //       )
  //     }
  //   })
};


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
    console.log("Requesting", query);

    return geolocate(query).then((location) => {
      console.log("got location", location);
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
      .catch(error => {
        console.log(error);
        return {statusCode: 400, body: String(error)}
      });
    });
}


