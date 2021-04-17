import React from "react";

import useLegislators from "../useAllCurrentLegislators";

import LegislatorMap from "./Map";

type Props = {
  bill: GatsbyTypes.Bill;
};

export default function MapWrapper({ bill }: Props) {
  const legs = useLegislators() as GatsbyTypes.Legislator[];
  const co_sponsors = new Set(bill.co_sponsors.map((leg) => leg.id));
  const data = legs.map((leg) => ({
    ...leg,
    img: leg.square_picture,
    lat: leg.district.lat,
    lng: leg.district.lng,
    name: `${leg.first_name} ${leg.last_name}`,
    style: co_sponsors.has(leg.id) ? "green" : "red",
  }));
  return <LegislatorMap data={data} />;
}
