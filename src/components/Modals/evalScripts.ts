import doT from "dot";
import _ from "lodash";
import mapValues from "lodash/mapValues";
import isString from "lodash/isString";
import keys from "lodash/keys";

import { Scripts } from "../../types";

type StringTree = { [key: string]: string | StringTree };

doT.templateSettings.interpolate = /\{([\s\S]+?)\}/g;
doT.templateSettings.strip = false;

export function merge(scripts1: Scripts, scripts2: Partial<Scripts>) {
  return _.mergeWith({}, scripts1, scripts2, (a, b) => (b == null ? a : undefined));
}

export function evalScripts(scripts: Scripts, params: { [key: string]: Object }): Scripts {
  const param_names = keys(params);
  const paramList = param_names.map((name) => params[name]);
  doT.templateSettings.varname = param_names.join(",");
  function evalScriptsRec(tree: StringTree) {
    return mapValues(tree, (child) => {
      if (isString(child)) {
        try {
          return doT.template(child)(...paramList);
        } catch (error) {
          console.error(`Invalid template: ${child}`);
          return child;
        }
      }
      return evalScriptsRec(child);
    });
  }
  return evalScriptsRec(scripts);
}
