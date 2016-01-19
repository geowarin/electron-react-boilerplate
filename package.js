'use strict';

const os = require('os');
const packager = require('electron-packager');
const rimraf = require('rimraf').sync;
const exec = require('child_process').execSync;
const pkg = require('./package.json');
const devDeps = Object.keys(pkg.devDependencies);

const shouldBuildAll = false;

const iconPath = 'app/app'; // without extension
const DEFAULT_OPTS = {
  dir: './',
  name: pkg.productName,
  // https://github.com/atom/electron/blob/master/docs/tutorial/application-packaging.md
  asar: false,
  ignore: [
    '/test($|/)',
    '/tools($|/)',
    '/release($|/)'
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`)),
  version: getElectronVersion()
};

const targets = shouldBuildAll ? getAllTargets() : [{platform: os.platform(), arch: os.arch()}];

rimraf('release');
targets.forEach((target) => packageApp(target));

// utils
function packageApp(target) {
  console.log(`building: ${target.platform}-${target.arch}`);
  const opts = Object.assign({}, DEFAULT_OPTS, target, {
    icon: getIcon(target.platform),
    prune: true,
    out: `release/${target.platform}-${target.arch}`
  });
  packager(opts, log(target.platform, target.arch));
}

function getElectronVersion() {
  try {
    const out = exec('npm list electron-prebuilt').toString();
    return out.split('electron-prebuilt@')[1].replace(/\s/g, '');
  } catch (err) {
    return '0.36.2';
  }
}

function getAllTargets() {
  const allVersions = [];
  const archs = ['ia32', 'x64'];
  const platforms = ['linux', 'win32', 'darwin'];

  platforms.forEach(platform => {
    archs.forEach(arch => {
      if (!(platform === 'darwin' && arch === 'ia32')) { // darwin 32 does not exist
	allVersions.push({platform, arch})
      }
    });
  });
  return allVersions;
}

function getIcon(platform) {
  const iconExt = platform === 'darwin' ? '.icns' : platform === 'win32' ? '.ico' : '.png';
  return iconPath + iconExt;
}

function log(platform, arch) {
  return (err) => {
    if (err) {
      return console.error(`Error building ${platform}-${arch}:`, err);
    }
    console.log(`${platform}-${arch} finished!`);
  };
}
