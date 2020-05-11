import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import virtual from "@rollup/plugin-virtual";
import typescript from "rollup-plugin-typescript2";
import builtins from "rollup-plugin-node-builtins";
import { mdxx } from "rollup-plugin-mdxx";
import { terser } from "rollup-plugin-terser";
import fs from "fs";

const plugins = [
  builtins(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        jsx: "react",
        target: "es2017",
        module: "esnext",
        jsx: "react",
        noEmit: true,
        esModuleInterop: true,
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
      },
    },
  }),
  nodeResolve(),
  commonjs(),
  mdxx(),
  terser({
    module: true,
  }),
];

const RUN_TEMPLATE = (entryPath) => `
import { h, render } from "preact";
import Entry from "${entryPath}";
render(h(Entry, {}), document.querySelector(".root"));
`;

const SSR_TEMPLATE = (entryPath) => `
import { h } from "preact";
import renderToString from "preact-render-to-string";
import Entry from "${entryPath}";
export default (props) => renderToString(h(Entry, props));
`;

const input = path.join(__dirname, "../script/bar.tsx");

const targetDir = path.join(__dirname, "../script");
const scriptNames = fs.readdirSync(targetDir);

console.log("names", scriptNames);

const config = scriptNames.map((name) => {
  const input = path.join(targetDir, name);
  const base = name.replace(".tsx", "");
  return [
    {
      input: `_$_${base}_run.js`,
      plugins: [
        virtual({ [`_$_${base}_run.js`]: RUN_TEMPLATE(input) }),
        ...plugins,
      ],
      output: {
        file: `public/static/amp-script/${base}/run.js`,
        format: "iife",
      },
    },
    {
      input: [`_$_${base}_ssr.js`],
      plugins: [
        virtual({ [`_$_${base}_ssr.js`]: SSR_TEMPLATE(input) }),
        ...plugins,
      ],
      output: {
        file: `public/static/amp-script/${base}/ssr.js`,
        format: "esm",
      },
    },
  ];
});

export default config.flat();

// export default [
//   {
//     input: "_$_run.js",
//     plugins: [virtual({ "_$_run.js": RUN_TEMPLATE(input) }), ...plugins],
//     output: {
//       file: "public/static/amp-script/bar/run.js",
//       format: "iife",
//     },
//   },
//   {
//     input: "_$_ssr.js",
//     plugins: [virtual({ "_$_ssr.js": SSR_TEMPLATE(input) }), ...plugins],
//     output: {
//       file: "public/static/amp-script/bar/ssr.js",
//       format: "esm",
//     },
//   },
// ];
