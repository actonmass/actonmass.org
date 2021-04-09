import yaml from "js-yaml";
import fs from "fs";

import config from "./config";

fs.writeFileSync("./admin/config.yml", yaml.dump(config));
