// eslint-disable-next-line
export function deepClone(data) {
  const dataJson = JSON.stringify(data);
  const dataClone = JSON.parse(dataJson);
  return dataClone;
}
