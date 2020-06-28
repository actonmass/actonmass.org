import { QueryResult } from "./findReps";

export default function getSessionLegs() {
  const sessionQuery = JSON.parse(window.sessionStorage.getItem("repQuery") ?? "null");
  if (sessionQuery == null) {
    return null;
  }
  return sessionQuery.repInfo as QueryResult;
}
