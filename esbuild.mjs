import * as esbuild from 'esbuild'
import * as fs from 'fs'
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/envshh.cjs',
})

const packageInfo = JSON.parse(fs.readFileSync("./package.json", "utf8"));
packageInfo.dependencies = {}
packageInfo.devDependencies = {}
packageInfo.peerDependencies = {}
packageInfo.scripts = {
  "test": "node envshh.cjs -v",
}
fs.writeFileSync('./dist/package.json', JSON.stringify(packageInfo, null, 2))