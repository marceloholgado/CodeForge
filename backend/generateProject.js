const fs = require("fs-extra");
const path = require("path");

/**
 * Generates the content for the main C++ source file (main.cpp) based on the given configuration.
 *
 * Includes standard and optional headers, and inserts example code depending on selected libraries,
 * resources, and frameworks.
 *
 */
function getMainFileContent({ lib, resources, frameworks }) {
  let includes = [`#include <iostream>`];
  let body = `int main() {\n    std::cout << "Hello, world!" << std::endl;\n    return 0;\n}`;

  if (lib === "Boost") {
    includes.push(`#include <boost/algorithm/string.hpp>`);
  }
  if (resources === "Multithreading") {
    includes.push(`#include <thread>`);
    body = `void say_hello() {\n    std::cout << "Hello from thread!" << std::endl;\n}\n\nint main() {\n    std::thread t(say_hello);\n    t.join();\n    return 0;\n}`;
  }

  return includes.join("\n") + "\n\n" + body;
}

function getMakefile({ project_name, build_system, frameworks }) {
  let testLine = frameworks === "Catch2" ? " -lCatch2Main" : "";
  return `all:\n\t${build_system} src/main.cpp -o ${project_name}${testLine}`;
}

async function generateProject(config, basePath) {
  await fs.ensureDir(basePath);
  await fs.ensureDir(path.join(basePath, "src"));
  await fs.ensureDir(path.join(basePath, "include"));

  const mainContent = getMainFileContent(config);
  const makefileContent = getMakefile(config);

  await fs.writeFile(path.join(basePath, "src", "main.cpp"), mainContent);
  await fs.writeFile(path.join(basePath, "Makefile"), makefileContent);
}

module.exports = { generateProject };
