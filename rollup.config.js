import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main,
            sourcemap: true,
            format: "cjs"
        },
        {
            file: pkg.module,
            sourcemap: true,
            format: "es"
        },
        {
            file: pkg["umd:main"],
            globals: {
                "@orby/core": "@orby/core"
            },
            sourcemap: true,
            format: "umd",
            name: pkg.name
        }
    ],
    external: ["@orby/core"],
    plugins: [babel(), terser()]
};
