import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

// import MagicString from 'magic-string'
// import { existsSync } from 'fs';
// // start Prepare OutPut Dir

// // End Prepare OutPut Dir
const output = {
	chunkFileNames: '[name]-dependencies.js',
	dir: 'bundle',
	entryFileNames: '[name].js',
	format: 'cjs',
};

const plugins = [
	json(),
	resolve(),
	commonjs({
		transformMixedEsModules: true,
	}),
];

const bundels = [
	{
		input: {
			//	'index.js'
			'cjs.index': 'index.js',
			'esm.index': 'esm-src/index.js',
		},
		output: {
			...output,
			banner: `/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
// @ts-ignore`,
			dir: 'lib',
			format: 'esm',
		},
		plugins,
	},
];
export default bundels;
