import { context } from 'esbuild';

const ctx = await context({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  sourcemap: true,
  outfile: 'Asset/dist/app.js',
  loader: { '.jsx': 'jsx' },
  jsx: 'automatic',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"development"' }
});

await ctx.watch();
console.log('Watching for changes in src/ ...');
