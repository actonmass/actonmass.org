#!node

import yaml from "js-yaml";
import * as fs from "fs";

import config from "./config";

const rootPath = __dirname + "/../../../";

export default function buildAdminConfig() {
  if (!fs.existsSync(rootPath + "/static/admin/")) {
    fs.mkdirSync(rootPath + "/static/admin/");
  }
  fs.writeFileSync(rootPath + "/static/admin/config.yml", yaml.dump(config));
}
