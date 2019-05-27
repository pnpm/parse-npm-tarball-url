# parse-npm-tarball-url

[![Build Status](https://travis-ci.org/pnpm/parse-npm-tarball-url.svg?branch=master)](https://travis-ci.org/pnpm/parse-npm-tarball-url)

> Parse a tarball URL hosted in the npm registry

## Installation

```
<pnpm|yarn|npm> add parse-npm-tarball-url
```

## Usage

```js
import parseNpmTarbalUrl from 'parse-npm-tarball-url'

const pkg = parseNpmTarbalUrl('http://registry.npmjs.org/foo/-/foo-1.0.0.tgz')

console.log(pkg)
// {
//   host: 'registry.npmjs.org',
//   name: 'foo',
//   version: '1.0.0'
// }
```

## Related

- [get-npm-tarball-url](https://github.com/pnpm/get-npm-tarball-url) - Create the tarball URL of a npm package

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
