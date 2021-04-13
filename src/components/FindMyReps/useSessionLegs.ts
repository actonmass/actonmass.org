import { useEffect, useState } from "react";
import { QueryResult } from "./findReps";

function getSessionLegs() {
  const sessionQuery = JSON.parse(window.sessionStorage.getItem("repQuery") ?? "null");
  if (sessionQuery == null) {
    return null;
  }
  return sessionQuery.repInfo as QueryResult;
}

export default function useSessionLegs() {
  const [legInfo, setLegInfo] = useState<QueryResult | null>(getSessionLegs());
  document.addEventListener("leg-search-results", (evt: CustomEvent) => {
    setLegInfo(evt.detail);
  });
  return legInfo;
}
