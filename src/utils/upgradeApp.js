import pkg from '../../package.json';

export default function () {
  localStorage.setItem('appVersion', JSON.stringify(pkg.version));
}
