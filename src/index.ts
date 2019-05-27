import url = require('url')
import assert = require('assert')
import semver = require('semver')

const parseUrl = url.parse

export type ParsedPackageInfo = {
  name: string,
  version: string,
}

export default function parseNpmTarballUrl (url: string): {
  host: string,
  pkg: ParsedPackageInfo,
} | null {
  assert(url, 'url is required')
  assert(typeof url === 'string', 'url should be a string')

  const urlObject = parseUrl(url)
  const pkg = urlObject.path && parsePath(urlObject.path)
  if (!pkg || !urlObject.host) return null
  return {
    host: urlObject.host,
    pkg,
  }
}

function parsePath (path: string): ParsedPackageInfo | null {
  const parts = path.split('/-/')
  if (parts.length !== 2) return null

  const name = parts[0] && decodeURIComponent(parts[0].substr(1))

  if (!name) return null

  const pathWithNoExtension = parts[1].replace(/\.tgz$/, '')

  const scopelessNameLength = name.length - (name.indexOf('/') + 1)

  const version = pathWithNoExtension.substr(scopelessNameLength + 1)

  if (!semver.valid(version, true)) return null

  return { name, version }
}
