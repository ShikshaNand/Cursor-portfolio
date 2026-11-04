import { build } from 'esbuild';

await Promise.all([
  build({ entryPoints: ['src/app.jsx'], bundle: true, minify: true, sourcemap: true, outfile: 'Asset/dist/app.js', loader: { '.jsx': 'jsx' }, jsx: 'automatic', target: ['es2020'], define: { 'process.env.NODE_ENV': '"production"' } }),
  build({ entryPoints: ['src/styles.css'], minify: true, sourcemap: true, outfile: 'Asset/dist/app.css' })
]);

console.log('Portfolio built: index.html + Asset/dist/app.js + Asset/dist/app.css');