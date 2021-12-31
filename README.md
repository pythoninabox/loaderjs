# loaderjs
loader app written in nwjs

using nwjs v0.29.4

## building

using `nw-builder` package: On Debian, installing `nw-build` globally returns an error, so following this procedure:

- create a directory with `mkdir name`
- `cd` into directory
- commands:

```bash
npm init -y
npm install nw-builder
```

go to app directory (where `package.json` is located) and run:

```bash
/path/to/nw-builder/node_modules/nw-builder/bin/nwbuild -p linux64 -v 0.29.4 -o dist .
```