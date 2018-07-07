import { sep } from 'path'
import { execSync } from 'child_process'
import detectPM from './detect-pm'

export default async function buildMainProcess(): Promise<void> {
  const pm: 'yarn'|'npm'|null = await detectPM()
  if (pm === null) {
    console.log('No available package manager! (`yarn` or `npm` is available)')
    process.exit(1)
  }

  const cwd: string = process.cwd()
  const webpack: string = pm === 'yarn' ? `node_modules${sep}.bin${sep}webpack` : `node_modules${sep}nextron${sep}node_modules${sep}.bin${sep}webpack`
  await execSync(`${webpack} --config=node_modules${sep}nextron${sep}dist${sep}webpack${sep}webpack.app.config.js --env=production`, { cwd })
}
