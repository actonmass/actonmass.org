import yaml from "js-yaml";
import fs from "fs";

import config from "./config";

export default function buildAdmingConfig() {
  fs.writeFileSync("./static/admin/config.yml", yaml.dump(config));
}
