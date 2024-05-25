import { minLength, maxLength, isEmail, leastSpecialChar, leastUpChar, isPhone } from '~/validate';

export function validateUtils(str: string, validates = {}) {
  if (str?.length > 0) {
    for (const [key, value] of Object.entries(validates)) {
      if (value) {
        // switch (key) {
        //   case 'minLength':
        //     if (!minLength(str, Number(value))) {
        //       return `${str?.min_length} ${value}`;
        //     }
        //     break;
        //   case 'maxLength':
        //     if (!maxLength(str, value)) {
        //       return `${transText?.max_length} ${value}`;
        //     }
        //     break;
        //   case 'isEmail':
        //     if (!isEmail(str)) {
        //       return transText?.need_is_email;
        //     }
        //     break;
        //   case 'isPhone':
        //     if (!isPhone(str)) {
        //       return transText?.need_is_phone;
        //     }
        //     break;
        //   case 'leastSpecialChar':
        //     if (!leastSpecialChar(str, value)) {
        //       return `${transText?.need_contain_at_least} ${value} ${transText?.special_char}`;
        //     }
        //     break;
        //   case 'leastUpChar':
        //     if (!leastUpChar(str, value)) {
        //       return `${transText?.need_contain_at_least} ${value} ${transText?.uppercase_char}`;
        //     }
        //     break;
        //   default:
        //     return '';
        // }
      }
    }
  }
  return '';
}
