import { URL } from 'url'
import assert = require('assert')
import { valid as validVersion } from 'semver'

export default function parseNpmTarballUrl (url: string): {
  host: string,
  name: string,
  version: string,
} | null {
  assert(url, 'url is required')
  assert(typeof url === 'string', 'url should be a string')

  const { pathname: path, host } = new URL(url)
  if (!path || !host) return null

  const pkg = parsePath(path)

  if (!pkg) return null
  return {
    host,
    name: pkg.name,
    version: pkg.version,
  }
}

function parsePath (path: string) {
  const parts = path.split('/-/')
  if (parts.length !== 2) return null

  const name = parts[0] && decodeURIComponent(parts[0].substr(1))

  if (!name) return null

  const pathWithNoExtension = parts[1].replace(/\.tgz$/, '')

  const scopelessNameLength = name.length - (name.indexOf('/') + 1)

  const version = pathWithNoExtension.slice(scopelessNameLength + 1)

  if (!validVersion(version, true)) return null

  return { name, version }
}
