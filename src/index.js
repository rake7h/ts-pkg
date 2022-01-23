import fs from "fs";
import path from "path";
import { execaSync } from "execa";

import { index, packageJson, test } from "./boilerplate.js";

const gitConfig = (prop) => {
  const op = execaSync("git", ["config", "--get", prop]).stdout;
  return op;
};

export const ensureDirectoryExists = (file) => {
  try {
    fs.mkdirSync(path.join(path.dirname(file)), { recursive: true });
  } catch {}
};

const writeFile = (loc, content, json) => {
  ensureDirectoryExists(loc);
  if (json) {
    fs.writeFileSync(loc, JSON.stringify(content, null, 2));
    return;
  }
  fs.writeFileSync(loc, content);
};

const makePkgJson = ({ packageName, pkgBoilerplate }) => {
  // default author metadata with git config
  const gitUserName = gitConfig("user.name");
  const gitUserEmail = gitConfig("user.email");

  pkgBoilerplate.name = packageName;
  pkgBoilerplate.author = `${gitUserName} <${gitUserEmail}>`;
  return pkgBoilerplate;
};

const writeAllBoilerplates = (loc, packageName) => {
  const fileStruc = {
    entry: "/src/index.ts",
    test: "/__tests__/foo.test.ts",
    pkg: "/package.json",
  };

  const packageJSON = makePkgJson({ pkgBoilerplate: packageJson, packageName });

  writeFile(path.normalize(loc + fileStruc.entry), index);
  writeFile(path.normalize(loc + fileStruc.test), test);
  writeFile(path.normalize(loc + fileStruc.pkg), packageJSON, true);
};

const tsPkg = ({ packagePath, packageName }) => {
  writeAllBoilerplates(packagePath, packageName);
};

export default tsPkg;

// const p = process.cwd() + "/temp2/";
//
// tsPkg({
//   packagePath: p,
//   packageName: "@hello/text-qw",
// });
