import L from 'leaflet';

const defaultZoom = 11;
const defaultCenter = [42.3587811, -71.2];
const tileURL =
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';


function getIconClass(datum) {
  if (datum.style === 'green') {
    return "rep-icon green"
  }
  return "rep-icon red"
}

function renderMap(id, data) {
  var map = L.map(id).setView(defaultCenter, defaultZoom);

  L.tileLayer(tileURL, {
    attribution: attribution,
    maxZoom: 12,
    minZoom: 8,
    id: "mapbox.streets",
    accessToken: "your.mapbox.access.token"
  }).addTo(map);

  map.setMaxBounds([
    [41, -74],
    [43, -69]
  ]);

  data.forEach(function(datum) {
    var icon = L.divIcon({
      className: getIconClass(datum),
      html:
        '<a href="' +
        datum.href +
        '"><img src="' +
        datum.img +
        '" alt="Avatar"></a>',
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    if (datum.chamber == 'senate') {
      return;
    }
    L.marker([datum.lat, datum.lng], { icon: icon }).addTo(map);
  });
}

export default { renderMap };
