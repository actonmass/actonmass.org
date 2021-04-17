import yaml from "js-yaml";
import fs from "fs";

import config from "./config";

export default function buildAdminConfig() {
  if (!fs.existsSync("./static/admin/")) {
    fs.mkdirSync("./static/admin/");
  }
  fs.writeFileSync("./static/admin/config.yml", yaml.dump(config));
}
