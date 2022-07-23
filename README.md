# bptsdx

## functional

[see https://github.com/jonaskello/eslint-plugin-functional](https://github.com/jonaskello/eslint-plugin-functional)

```shell
yarn add -D eslint @typescript-eslint/parser tsutils eslint-plugin-functional
```

```jsonc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "env": {
    "es6": true
  },
  "plugins": [
    "@typescript-eslint",
    "functional"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:functional/external-recommended",
    "plugin:functional/recommended",
    "plugin:functional/stylistic"
  ]
}
```

```shell
npm i -D typescript@4.7.2 typescript-eslint-language-service @typescript/analyze-trace process-tracing
```

```shell
yarn add -D prettier typescript-eslint-language-service eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier
```

```javascript
// @ts-check
/** @type {import('rollup').RollupOptions} */
import dts from 'rollup-plugin-dts';
//import esbuild from 'rollup-plugin-esbuild';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const bundle = (config) => ({
  ...config,
  input: './src/index.ts',
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [
      typescript({
        rollupCommonJSResolveHack: true,
        clean: true,
      }),
      commonjs(),
    ],
  input: './src/index.ts',
    output: [
      {
        //        file: `dist/index.js`,
        file: pkg.main,
        exports: 'named',
        format: 'cjs',
        sourcemap: true,
      },
      {
        //        file: `dist/index.mjs`,
        file: pkg.module,
        exports: 'named',
        format: 'esm',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
  }),
];

```



boilerplate typescript generator - tsdx on wings

```shell
yarn add -D rollup-plugin-esbuild@latest rollup@latest rollup-plugin-dts@latest tslib typescript@4.6.3 esbuild downlevel-dts @babel/plugin-proposal-class-properties @babel/plugin-proposal-nullish-coalescing-operator @babel/preset-typescript @babel/plugin-transform-typescript  @babel/plugin-transform-runtime @rollup/plugin-typescript @rollup/plugin-babel @babel/core 
```
<pre>
rollup-plugin-esbuild@latest rollup@latest \
rollup-plugin-dts@latest tslib typescript@4.6.3 \
esbuild downlevel-dts @babel/plugin-proposal-class-properties \
@babel/plugin-proposal-nullish-coalescing-operator @babel/preset-typescript \ 
@babel/plugin-transform-typescript  @babel/plugin-transform-runtime \
@rollup/plugin-typescript @rollup/plugin-babel @babel/core 
</pre>
