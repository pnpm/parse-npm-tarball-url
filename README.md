# parse-npm-tarball-url

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

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
