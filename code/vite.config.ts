import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// 为了ts-client做的配置
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [
		sveltekit(),
		// 为了ts-client做的配置
		nodeResolve()
	],
	// 为了ts-client做的配置
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true
				})
			]
		}
	}
});
