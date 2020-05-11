import fs from "fs";
import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import virtual from "@rollup/plugin-virtual";
import typescript from "rollup-plugin-typescript2";
import builtins from "rollup-plugin-node-builtins";
import { mdxx } from "rollup-plugin-mdxx";
import { terser } from "rollup-plugin-terser";

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
const root = document.querySelector(".root");
const encoded = root.id;
const props = encoded ? JSON.parse(atob(encoded)) : {};
render(h(Entry, props), root);
`;

const SSR_TEMPLATE = (entryPath) => `
import { h } from "preact";
import renderToString from "preact-render-to-string";
import Entry from "${entryPath}";
export default (props) => renderToString(h(Entry, props));
`;

const targetDir = path.join(__dirname, "../script");
const scriptNames = fs.readdirSync(targetDir);

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
        file: `public/amp-script/${base}/run.js`,
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
        file: `public/amp-script/${base}/ssr.js`,
        format: "esm",
      },
    },
  ];
});

export default config.flat();
