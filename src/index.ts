import assert from 'node:assert'

import semver from 'semver'

export type ParsedTarballUrl = {
  host: string
  name: string
  version: string
}

export function parseNpmTarballUrl (url: string): ParsedTarballUrl | null {
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

function parsePath (path: string): { name: string, version: string } | null {
  const parts = path.split('/-/')
  if (parts.length !== 2) return null

  const name = parts[0] && decodeURIComponent(parts[0].slice(1))
  if (!name) return null

  const pathWithNoExtension = parts[1].replace(/\.tgz$/, '')
  const scopelessNameLength = name.length - (name.indexOf('/') + 1)
  const version = pathWithNoExtension.slice(scopelessNameLength + 1)

  if (!semver.valid(version, true)) return null

  return { name, version }
}
