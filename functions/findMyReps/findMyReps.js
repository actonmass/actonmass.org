const axios = require('axios');

const { OPEN_STATES_API_KEY } = process.env;

const GetRepShortID = (info) => {
    const firstName = info.givenName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const lastName = info.familyName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
}

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


const LEGISLATOR_QUERY = `
query getLocalLegislators($latitude: Float, $longitude: Float) {
  senator: people(latitude: $latitude, longitude: $longitude, memberOf: "ocd-organization/1a75ab3a-669b-43fe-ac8d-31a2d6923d9a", first: 1) {
    edges {
      node {
        id
        name
        familyName
        givenName
      }
    }
  }
  representative: people(latitude: $latitude, longitude: $longitude, memberOf: "ocd-organization/ca38ad9c-c3d5-4c4f-bc2f-d885218ed802", first: 1) {
    edges {
      node {
        id
        name
        familyName
        givenName
      }
    }
  }
}
`

exports.handler = async (event, context) => {
    const address = JSON.parse(event.body);
    console.log("Requesting Address", address);

    return geolocate(address).then((location) => {
      console.log("Requesting Coordinates", location);
      return axios.post(
        API_ENDPOINT,
        {
          query: LEGISLATOR_QUERY,
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
      .then(response => response.data)
      .then((data) => {
        const senData = data.data.senator.edges[0].node
        const repData = data.data.representative.edges[0].node
        return {
          statusCode: 200,
          body: JSON.stringify({
            senator: {
              short_id: GetRepShortID(senData),
              name: senData.name
            },
            representative: {
              short_id: GetRepShortID(repData),
              name: repData.name
            }
          })
        };
      })
      .catch(error => {
        console.log(error);
        return {statusCode: 400, body: String(error)}
      });
    });
}


