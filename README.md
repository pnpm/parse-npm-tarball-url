# parse-npm-tarball-url

[![Greenkeeper badge](https://badges.greenkeeper.io/pnpm/parse-npm-tarball-url.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/pnpm/parse-npm-tarball-url.svg?branch=master)](https://travis-ci.org/pnpm/parse-npm-tarball-url)

> Parse a tarball URL hosted in the npm registry

## Installation

```
npm i -S parse-npm-tarball-url
```

## Usage

```js
import parseNpmTarbalUrl from 'parse-npm-tarball-url'

const spec = parseNpmTarbalUrl('http://registry.npmjs.org/foo/-/foo-1.0.0.tgz')

console.log(spec)
// {
//   host: 'registry.npmjs.org',
//   pkg: {
//    name: 'foo',
//    version: '1.0.0'
//   }
// }
```

## Related

- [get-npm-tarball-url](https://github.com/pnpm/get-npm-tarball-url) - Create the tarball URL of a npm package

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
