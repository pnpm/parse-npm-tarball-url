import test = require('tape')
import parseNpmTarballUrl from 'parse-npm-tarball-url'

test('parse simple URL', t => {
  t.deepEqual(
    parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo-1.0.0.tgz'),
    {
      host: 'registry.yarnpkg.com',
      name: 'foo',
      version: '1.0.0',
    },
  )

  t.end()
})

test('parse simple URL with prerelease version', t => {
  t.deepEqual(
    parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo-1.0.0-beta.0.tgz'),
    {
      host: 'registry.yarnpkg.com',
      name: 'foo',
      version: '1.0.0-beta.0',
    },
  )

  t.end()
})

test('parse URL of encoded scoped package', t => {
  t.deepEqual(
    parseNpmTarballUrl('http://registry.npmjs.org/@foo%2fbar/-/bar-1.0.0.tgz'),
    {
      host: 'registry.npmjs.org',
      name: '@foo/bar',
      version: '1.0.0',
    },
  )

  t.end()
})

test('parse URL of scoped package', t => {
  t.deepEqual(
    parseNpmTarballUrl('http://registry.npmjs.org/@foo/bar/-/bar-1.0.0.tgz'),
    {
      host: 'registry.npmjs.org',
      name: '@foo/bar',
      version: '1.0.0',
    },
  )

  t.end()
})

test('parse URL of scoped package with prerelease version', t => {
  t.deepEqual(
    parseNpmTarballUrl('http://registry.npmjs.org/@foo/bar/-/bar-1.0.0-beta.0.tgz'),
    {
      host: 'registry.npmjs.org',
      name: '@foo/bar',
      version: '1.0.0-beta.0',
    },
  )

  t.end()
})

test('return null on invalid URLs', t => {
  t.equal(parseNpmTarballUrl('http://registry.npmjs.org/index.html'), null)
  t.equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo-qar.tgz'), null)
  t.equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/qar.tgz'), null)
  t.equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/foo.tgz'), null)
  t.equal(parseNpmTarballUrl('http://registry.yarnpkg.com/foo/-/.tgz'), null)
  t.end()
})
