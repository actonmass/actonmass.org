import 'leaflet/dist/leaflet.css';

import React from 'react';

import { Link } from 'gatsby';
import ReactDOMServer from 'react-dom/server';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

const defaultZoom = 11;
const tileURL =
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnBhZ25vdXgiLCJhIjoiY2pmbjB2d290MHpyMDMzb2R6ZTF5dmcxcCJ9.zcVx-KR40EykTFuHxLmjnw";
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

let L;

const isBrowser = typeof window != "undefined" && window != null;

if (isBrowser) {
  import("leaflet")
    .then((obj) => (L = obj))
    .catch((err) => console.error("Failed to import leaflet"));
}

function getIconClass(leg) {
  if (leg.style === "green") {
    return "rep-icon green";
  }
  return "rep-icon red";
}

const LegIcon = ({ leg, size }) => {
  return (
    <img
      src={leg.img ?? "/img/person-icon.png"}
      alt={`Photo of ${leg.first_name} ${leg.last_name}`}
      width={`${40 * size}px`}
      height={`${40 * size}px`}
      style={{ borderWidth: 4 * size, objectFit: "cover", objectPosition: "50% 0%" }}
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

export default class LegislatorMap extends React.Component {
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
    if (!isBrowser) {
      return null;
    }
    const defaultCenter = screen.width >= 700 ? [42.3587811, -71.2] : [42.3587811, -71.1];
    const { data } = this.props;
    const refSize = this.state.refSize;
    return (
      <>
        <ul className="tabs">
          <li
            className={`fInactive fUppercase fRaleway tab ${
              this.state.chamber === "house" ? "active" : ""
            }`}
          >
            <a
              href="#"
              className="no-color"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ chamber: "house" });
              }}
            >
              Representatives
            </a>
          </li>
          <li
            className={`fInactive fUppercase fRaleway tab ${
              this.state.chamber === "senate" ? "active" : ""
            }`}
          >
            <a
              href="#"
              className="no-color"
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
          <MapContainer
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
                        <Link to={leg.href}>{leg.name}</Link>
                        {leg.party && <> - {leg.party}</>}
                      </span>
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>
        </div>
      </>
    );
  }
}
