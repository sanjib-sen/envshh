import * as esbuild from 'esbuild'
import * as fs from 'fs'

const packageInfo = JSON.parse(fs.readFileSync("./package.json", "utf8"));
fs.writeFileSync('./src/cli/version.ts',`export const version = "${packageInfo.version}"`)
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/envshh.cjs',
})

packageInfo.dependencies = {}
packageInfo.devDependencies = {}
packageInfo.peerDependencies = {}
packageInfo.scripts = {
  "test": "node envshh.cjs -v",
}
fs.writeFileSync('./dist/package.json', JSON.stringify(packageInfo, null, 2))