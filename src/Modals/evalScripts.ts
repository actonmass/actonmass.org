import doT from "dot";
import _ from "lodash";

import { Scripts } from "../types";

type StringTree = { [key: string]: string | StringTree };

doT.templateSettings.interpolate = /\{([\s\S]+?)\}/g;
doT.templateSettings.strip = false;

export function evalScripts(scripts: Scripts, params: { [key: string]: Object }): Scripts {
  const param_names = _.keys(params);
  const paramList = param_names.map((name) => params[name]);
  doT.templateSettings.varname = param_names.join(",");
  function evalScriptsRec(tree: StringTree) {
    return _.mapValues(tree, (child) => {
      if (_.isString(child)) {
        return doT.template(child)(...paramList);
      }
      return evalScriptsRec(child);
    });
  }
  return evalScriptsRec(scripts);
}
