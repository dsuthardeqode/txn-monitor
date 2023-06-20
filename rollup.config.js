const typescript = require("rollup-plugin-typescript2");
const babel = require("@rollup/plugin-babel");
const generatePackageJson = require("rollup-plugin-generate-package-json");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    typescript(),
    generatePackageJson(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**", // Exclude external dependencies from Babel
    }),
  ],
};
