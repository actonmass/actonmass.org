const axios = require("axios");
const fs = require("fs");
const mapValues = require("lodash/mapValues");

const { OPEN_STATES_API_KEY, GOOGLE_API_KEY, NETLIFY_DEV } = process.env;
const isDev = NETLIFY_DEV == "true";
const shouldMockInDev = true;

function loadAllLegData() {
  return require("./leg-data.json");
}

const allLegData = loadAllLegData();

function mockGeolocate(address) {
  return new Promise(function (resolve, reject) {
    setTimeout(
      () =>
        resolve({
          lat: 41.94596,
          lng: -71.11581,
        }),
      500
    );
  });
}

async function geolocate(address) {
  return await axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: `${address.streetAddress}, ${address.city}`,
        components: `country:US|administrative_area:MA`,
        key: GOOGLE_API_KEY,
      },
    })
    .then(function (response) {
      if (response.data.results.length) {
        return response.data.results[0].geometry.location;
      } else {
        // couldn't geolocate the address
        return null;
      }
    });
}

const API_ENDPOINT = "https://openstates.org/graphql";

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
`;

async function fetchLegAtLocation(location) {
  console.log("Requesting Coordinates", location);
  const openStateResponse = await axios.post(
    API_ENDPOINT,
    {
      query: LEGISLATOR_QUERY,
      variables: {
        latitude: location.lat,
        longitude: location.lng,
      },
    },
    {
      headers: {
        "X-API-KEY": OPEN_STATES_API_KEY,
      },
    }
  );

  const data = openStateResponse.data;
  console.log("Received:");
  console.log(JSON.stringify(data));
  const senId = data.data.senator.edges[0] && data.data.senator.edges[0].node.id;
  const repId = data.data.representative.edges[0] && data.data.representative.edges[0].node.id;

  return {
    senator: senId,
    representative: repId,
  };
}

async function fetchLegAtAdrs(address) {
  console.log("Requesting Address", address);
  const location = await geolocate(address);

  if (location == null) {
    return { error: { code: "couldNotLocateAddressInMa", status: 422 } };
  }

  const legIds = await fetchLegAtLocation(location);
  return { legIds };
}

async function fetchLegAtAdrsMock() {
  return new Promise(function (resolve) {
    setTimeout(
      () =>
        resolve({
          legIds: {
            senator: "ocd-person/fb97b139-c0dd-41b5-ae52-159528f47b11",
            representative: "ocd-person/33017dde-3525-43ff-8c3a-fb44a4a9d833",
          },
        }),
      500
    );
  });
}

async function handleRequest(requestBody) {
  const address = JSON.parse(requestBody);

  const { legIds, error } =
    isDev && shouldMockInDev ? await fetchLegAtAdrsMock(address) : await fetchLegAtAdrs(address);

  if (error != null) {
    return {
      statusCode: error.status,
      body: JSON.stringify({
        errorCode: error.code,
      }),
    };
  }

  const legData = mapValues(legIds, (legId) => {
    return allLegData[legId];
  });

  return {
    statusCode: 200,
    body: JSON.stringify(legData),
  };
}

exports.handler = async (event, context) => {
  try {
    return await handleRequest(event.body);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        errorCode: "unexpectedError",
      }),
    };
  }
};
