# Electron react starter

A starter desktop app made with electron.
Powered by React, Redux, React-router (and redux-simple-router) with hot reloading.

Uses [photon bindings for react](https://github.com/react-photonkit/react-photonkit)
to create a native look and feel.

## Package all


To create a package for your current architecture:

```
npm run package
```

To create a package for all architectures (linux, windows, mac):

```
npm run package:all
```

To create the window package, you need wine.

On mac, install it with brew:

```
brew install wine makensis
```
