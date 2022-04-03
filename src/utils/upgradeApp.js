import pkg from '../../package.json';

export default function upgradeApp() {
  localStorage.setItem('appVersion', JSON.stringify(pkg.version));
}
