import React from "react";
import { render } from "react-dom";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const defaultZoom = 11;
const defaultCenter = [42.3587811, -71.2];
const tileURL =
  "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

function getIconClass(leg) {
  if (leg.style === "green") {
    return "rep-icon green";
  }
  return "rep-icon red";
}

const LegIcon = ({ leg }) => {
  return (
    // <a href={leg.href}>
    <img src={leg.img} alt="Avatar" />
    // </a>
  );
};

function getIcon(leg) {
  return L.divIcon({
    className: getIconClass(leg),
    html: ReactDOMServer.renderToStaticMarkup(<LegIcon leg={leg} />),
    iconSize: [0, 0],
    iconAnchor: [24, 28]
  });
}

class LegislatorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chamber: "house"
    };
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <ul>
          <li><a href="JavaScript:void(0);" onClick={() => this.setState({chamber: "house"}) }>Representatives</a></li>
          <li><a href="JavaScript:void(0);" onClick={() => this.setState({chamber: "senate"}) }>Senators</a></li>
        </ul>
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
            leg =>
              leg.chamber == this.state.chamber && (
                <div>
                  <Marker
                    position={[leg.lat, leg.lng]}
                    icon={getIcon(leg)}
                    key={leg.href}
                  >
                    <Popup offset={[0, -20]}>
                      <span>
                        <a href={leg.href}>{leg.name}</a> - {leg.party}
                      </span>
                    </Popup>
                  </Marker>
                </div>
              )
          )}
        </Map>
      </div>
    );
  }
}

function renderMap(targetID, data) {
  const targetEl = document.getElementById(targetID);
  render(<LegislatorMap data={data} />, targetEl);
}

export default { renderMap };
