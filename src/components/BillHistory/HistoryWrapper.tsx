import React from "react";
import _ from "lodash";

import BillHistory from "./BillHistory";

export default function HistoryWrapper({ bill }: { bill: GatsbyTypes.Bill }) {
  const events = bill.history.map((event) => {
    if (event.bill_event == null) {
      return event;
    }
    return event.bill_event;
  });
  return <BillHistory data={events} />;
}
