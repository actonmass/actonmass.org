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


module.exports = geoLocate;
