import url = require('url')
import assert = require('assert')
import semverRegex = require('semver-regex')

const parseUrl = url.parse

export type ParsedPackageInfo = {
  name: string,
  version: string,
}

export default function (url: string): {
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
  const name = getName(path)

  if (!name) return null

  const version = getVersion(path)

  if (!version) return null

  return { name, version }
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
