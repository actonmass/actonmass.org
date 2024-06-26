import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
  faGlobeAmericas,
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
  faGlobeAmericas,

  // For about us page
  faGraduationCap,
  faVoteYea,
  faUsers
);
