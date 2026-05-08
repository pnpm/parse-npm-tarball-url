import { deepEqual, equal } from 'node:assert/strict'
import { test } from 'node:test'

import { parseNpmTarballUrl } from '../src/index.ts'

test('parse simple URL', () => {
  deepEqual(
    parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo-1.0.0.tgz'),
    {
      host: 'registry.yarnpkg.com',
      name: 'foo',
      version: '1.0.0',
    }
  )
})

test('parse simple URL with prerelease version', () => {
  deepEqual(
    parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo-1.0.0-beta.0.tgz'),
    {
      host: 'registry.yarnpkg.com',
      name: 'foo',
      version: '1.0.0-beta.0',
    }
  )
})

test('parse URL of encoded scoped package', () => {
  deepEqual(
    parseNpmTarballUrl('http://registry.npmjs.org/@foo%2fbar/-/bar-1.0.0.tgz'),
    {
      host: 'registry.npmjs.org',
      name: '@foo/bar',
      version: '1.0.0',
    }
  )
})

test('parse URL of scoped package', () => {
  deepEqual(
    parseNpmTarballUrl('http://registry.npmjs.org/@foo/bar/-/bar-1.0.0.tgz'),
    {
      host: 'registry.npmjs.org',
      name: '@foo/bar',
      version: '1.0.0',
    }
  )
})

test('parse URL of scoped package with prerelease version', () => {
  deepEqual(
    parseNpmTarballUrl('http://registry.npmjs.org/@foo/bar/-/bar-1.0.0-beta.0.tgz'),
    {
      host: 'registry.npmjs.org',
      name: '@foo/bar',
      version: '1.0.0-beta.0',
    }
  )
})

test('return null on invalid URLs', () => {
  equal(parseNpmTarballUrl('http://registry.npmjs.org/index.html'), null)
  equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo-qar.tgz'), null)
  equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/qar.tgz'), null)
  equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo.tgz'), null)
  equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/.tgz'), null)
})
