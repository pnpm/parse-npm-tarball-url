import url = require('url')
import assert = require('assert')
import semverRegex = require('semver-regex')

const parseUrl = url.parse

export type ParsedPackageInfo = {
  name: string | null,
  version: string | null,
}

export default function (url: string): {
  host: string | null,
  pkg: ParsedPackageInfo | null,
} {
  assert(url, 'url is required')
  assert(typeof url === 'string', 'url should be a string')

  const urlObject = parseUrl(url)
  const pkg = urlObject.path && parsePath(urlObject.path)
  return {
    host: urlObject.host || null,
    pkg: pkg && (pkg.name || pkg.version) && pkg || null,
  }
}

function parsePath (path: string): ParsedPackageInfo {
  return {
    name: getName(path),
    version: getVersion(path),
  }
}

function getName (path: string) {
  const parts = path.split('/-/')
  if (parts.length !== 2) return null
  return parts[0] && parts[0].substr(1)
}

function getVersion (path: string): string | null {
  const pathWithNoExtension = path.replace(/\.tgz$/, '')
  const matches = pathWithNoExtension.match(semverRegex())
  return matches && matches[matches.length - 1]
}
