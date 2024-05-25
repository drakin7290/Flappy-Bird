export default function fetchApiUser(fn) {
  let arrK = process.env.IPREGISTRY_API_KEY.split(',');
  let k = arrK[Math.floor(Math.random() * arrK.length)];
  fetch('https://api.ipregistry.co/?key=' + k)
    .then(function (response) {
      return response.json();
    })
    .then(function (payload) {
      fn(payload);
    })
    .catch((err) => {
      console.log(err);
    });
}
