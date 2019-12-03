import React from "react";
import { render } from "react-dom";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const defaultZoom = 11;
const defaultCenter = [42.3587811, -71.2];
const tileURL =
  "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

function getIconClass(datum) {
  if (datum.style === "green") {
    return "rep-icon green";
  }
  return "rep-icon red";
}

function getIcon(datum) {
  return L.divIcon({
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
}

const LegislatorMap = ({ data }) => {
  return (
    <div>
      <h1>The map:</h1>
      <Map
        center={defaultCenter}
        zoom={defaultZoom}
        maxZoom={12}
        minZoom={8}
        maxBounds={[
          [41, -74],
          [43, -69]
        ]}
      >
        <TileLayer attribution={attribution} url={tileURL} />
        {data.map(
          datum =>
            datum.chamber == "house" && (
              <Marker
                position={[datum.lat, datum.lng]}
                icon={getIcon(datum)}
                key={datum.href}
              ></Marker>
            )
        )}
        <Marker position={defaultCenter}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

function renderMap(targetID, data) {
  const targetEl = document.getElementById(targetID);
  render(<LegislatorMap data={data} />, targetEl);
}

export default { renderMap };
