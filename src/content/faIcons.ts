import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTemperatureHigh,
  faBalanceScale,
  faPen,
  faTransgenderAlt,
  faHeartbeat,
  faHome,
  faRandom,
  faFistRaised,
  faEquals,
  faDollarSign,
  faCheckSquare,
  faGraduationCap,
  faVoteYea,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

// TODO: This should be generated dynamically from the issues, but that would require some gatsby-node magic
library.add(
  faTemperatureHigh,
  faBalanceScale,
  faPen,
  faTransgenderAlt,
  faHeartbeat,
  faHome,
  faRandom,
  faFistRaised,
  faEquals,
  faDollarSign,
  faCheckSquare,

  // For about us page
  faGraduationCap,
  faVoteYea,
  faUsers
);
