'use strict';

const os = require('os');
const webpack = require('webpack');
const cfg = require('./webpack.config.production.js');
const packager = require('electron-packager');
const del = require('del');
const exec = require('child_process').exec;
const pkg = require('./package.json');
const devDeps = Object.keys(pkg.devDependencies);

const appName = pkg.productName;
const shouldUseAsar = false;
const shouldBuildAll = false;

const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  ignore: [
    '/test($|/)',
    '/tools($|/)',
    '/release($|/)'
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
};

DEFAULT_OPTS.icon = 'app/app';

// use the same version as the currently-installed electron-prebuilt
exec('npm list electron-prebuilt', (err, stdout) => {
  if (err) {
    DEFAULT_OPTS.version = '0.36.2';
  } else {
    DEFAULT_OPTS.version = stdout.split('electron-prebuilt@')[1].replace(/\s/g, '');
  }

  startPack();
});


function startPack() {
  console.log('start pack...');
  webpack(cfg, (err, stats) => {
    if (err) return console.error(err);
    del('release')
    .then(paths => {
      if (shouldBuildAll) {
        // build for all platforms
        const archs = ['ia32', 'x64'];
        const platforms = ['linux', 'win32', 'darwin'];

        platforms.forEach(plat => {
          archs.forEach(arch => {
            pack(plat, arch, log(plat, arch));
          });
        });
      } else {
        // build for current platform only
        pack(os.platform(), os.arch(), log(os.platform(), os.arch()));
      }
    })
    .catch(err => {
      console.error(err);
    });
  });
}

function pack(plat, arch, cb) {
  // there is no darwin ia32 electron
  if (plat === 'darwin' && arch === 'ia32') return;

  const iconObj = {
    icon: DEFAULT_OPTS.icon + (() => {
      let extension = '.png';
      if (plat === 'darwin') {
        extension = '.icns';
      } else if (plat === 'win32') {
        extension = '.ico';
      }
      return extension;
    })()
  };

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
    platform: plat,
    arch,
    prune: true,
    out: `release/${plat}-${arch}`
  });

  packager(opts, cb);
}


function log(plat, arch) {
  return (err, filepath) => {
    if (err) return console.error(err);
    console.log(`${plat}-${arch} finished!`);
  };
}
