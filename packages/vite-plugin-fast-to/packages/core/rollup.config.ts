import { defineConfig }  from "rollup";
import rollupTypescript from "@rollup/plugin-typescript";


export default defineConfig({
  input: "./src/index.ts",
	output: {
		file: 'dist/vite-plugin-fast-to.js',
		format: 'cjs'
	},
  plugins: [		
		rollupTypescript({
			tsconfig: "tsconfig.json",
      skipLibCheck: true,
		}),
	],
})
