export function encodeQueryData(data: object) {
  let ret = [];
  for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}
