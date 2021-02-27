import React from "react";
import { render } from "react-dom";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const defaultZoom = 11;
const defaultCenter = screen.width >= 700 ? [42.3587811, -71.2] : [42.3587811, -71.1];
const tileURL =
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

function getIconClass(leg) {
  if (leg.style === "green") {
    return "rep-icon green";
  }
  return "rep-icon red";
}

const LegIcon = ({ leg, size }) => {
  return (
    <img
      src={leg.img}
      alt="Avatar"
      width={`${40 * size}px`}
      height={`${40 * size}px`}
      style={{ borderWidth: 4 * size }}
    />
  );
};

function getIcon(leg, refSize) {
  return L.divIcon({
    className: getIconClass(leg),
    html: ReactDOMServer.renderToStaticMarkup(<LegIcon leg={leg} size={refSize} />),
    iconSize: [0, 0],
    iconAnchor: [24 * refSize, 28 * refSize],
  });
}

class LegislatorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chamber: "house",
      refSize: 1,
    };
  }

  getIconSize = (zoomLevel) => {
    switch (zoomLevel) {
      case 8:
        return 0.5;
      case 9:
        return 0.5;
      case 10:
        return 1;
      case 11:
        return 1;
      case 12:
        return 1.5;
    }
  };

  onZoomlevelschange = (event) => {
    this.setState({ refSize: this.getIconSize(this.currentZoom) });
  };

  get currentZoom() {
    return this.map.leafletElement.getZoom();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state) != JSON.stringify(nextState);
  }

  render() {
    const { data } = this.props;
    const refSize = this.state.refSize;
    return (
      <>
        <ul className="tabs">
          <li className={`fInactive fUppercase fRaleway tab ${this.state.chamber === "house" ? "active" : ""}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ chamber: "house" });
              }}
            >
              Representatives
            </a>
          </li>
          <li className={`fInactive fUppercase fRaleway tab ${this.state.chamber === "senate" ? "active" : ""}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ chamber: "senate" });
              }}
            >
              Senators
            </a>
          </li>
        </ul>
        <div className="map-container darker">
          <Map
            ref={(ref) => {
              this.map = ref;
            }}
            center={defaultCenter}
            zoom={defaultZoom}
            dragging={!L.Browser.mobile}
            tap={!L.Browser.mobile}
            maxZoom={12}
            minZoom={8}
            maxBounds={[
              [41, -74],
              [43, -69],
            ]}
            onZoomEnd={this.onZoomlevelschange}
          >
            <TileLayer attribution={attribution} url={tileURL} />
            {data.map(
              (leg) =>
                leg.chamber == this.state.chamber && (
                  <Marker position={[leg.lat, leg.lng]} icon={getIcon(leg, refSize)} key={leg.href}>
                    <Popup offset={[0, -20 * refSize]}>
                      <span>
                        <a href={leg.href}>{leg.name}</a> - {leg.party}
                      </span>
                    </Popup>
                  </Marker>
                )
            )}
          </Map>
        </div>
      </>
    );
  }
}

function renderMap(targetID, data) {
  const targetEl = document.getElementById(targetID);
  render(<LegislatorMap data={data} />, targetEl);
}

export default { renderMap };
