export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}


//return 1 value from arr (random index)
export function arrRandom(arr, f = 0, t = arr.length) {
  return arr[randomNum(f, t)];
}
