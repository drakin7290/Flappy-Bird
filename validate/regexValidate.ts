export function leastUpChar(str: string, minUpperCase = 1) {
  const pattern = new RegExp(`^(?:[^A-Z]*[A-Z]){${minUpperCase},}`, 'g');
  return pattern.test(str);
}
export function isPhone(str: string) {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return pattern.test(str);
}
export function isEmail(str: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(str);
}
export function maxLength(str: string, number: number | undefined = undefined) {
  if (number) {
    if (str.length <= number) {
      return true;
    }
    return false;
  }
  return true;
}
export function minLength(str: string, number: number = 0) {
  return str.length >= number;
}
export function leastSpecialChar(str: string, number = 1) {
  const pattern = new RegExp('(.*[!@#$%^&*()\\-+={}\\[\\]|;:\'",.<>?~`]){' + number + ',}.*');
  return pattern.test(str);
}
