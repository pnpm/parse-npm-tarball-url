import test = require('tape')
import parseNpmTarballUrl from '../src'

test('parse simple URL', t => {
  const result = parseNpmTarballUrl('http://registry.npmjs.org/foo/-/foo-1.0.0.tgz')

  if (!result) {
    t.ok(result)
    return
  }

  t.equal(result.host, 'registry.npmjs.org')
  t.ok(result.pkg)
  t.equal(result.pkg.name, 'foo')
  t.equal(result.pkg.version, '1.0.0')

  t.end()
})

test('parse URL of scoped package', t => {
  const result = parseNpmTarballUrl('http://registry.npmjs.org/@foo/bar/-/bar-1.0.0.tgz')

  if (!result) {
    t.ok(result)
    return
  }

  t.equal(result.host, 'registry.npmjs.org')
  t.ok(result.pkg)
  t.equal(result.pkg.name, '@foo/bar')
  t.equal(result.pkg.version, '1.0.0')

  t.end()
})

test('return null if cannot parse', t => {
  const result = parseNpmTarballUrl('http://registry.npmjs.org/index.html')

  t.ok(result === null)

  t.end()
})
