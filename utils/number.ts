function removeTrailingZeros(str: string, maxLength: number) {
  // Remove trailing zeros and the dot if present
  const result = str.replace(/(\.0*|(?<=\.\d*?)0*)$/, '');

  // Limit the total length to maxLength
  if (result.length > maxLength) {
    return result?.substring(0, maxLength);
  }

  return result;
}

export function formatNumber(number: number | bigint, maxLength: number = 10): string {
  // Convert the number to a string
  if (Number(number) < 0.000001) {
    return '0';
  } else {
    var numberString = Number(number).toString();
    // Split the string into integer and decimal parts
    var parts = numberString.split('.');
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Check if the total length exceeds the specified maxLength
    var totalLength = parts.join('').length;
    if (totalLength > maxLength) {
      // Truncate the decimal part to fit within the maxLength
      var remainingLength = maxLength - parts[0].length;
      if (remainingLength < 0) {
        remainingLength = 0;
      }
      parts[1] = parts[1]?.substring?.(0, remainingLength).replace(/([1-9])0+/g, '$1');
    }
    // Join the parts with a dot and check if the result ends with a dot
    var result = /^0+$/.test(parts[1]) ? parts[0] : parts.join('.');
    if (result.endsWith('.')) {
      result = result.slice(0, -1); // Remove the trailing dot
    }

    // Display the result
    return result;
  }
}

export function formatShortCoin(number: number | string | undefined) {
  let formattedString: string = '0';
  if (number !== undefined) {
    if (typeof number === 'string') {
      number = Number(number);
    }
    if (number >= 1000000000) {
      const roundedNumber = Math.floor(number / 1000000);
      formattedString = (roundedNumber / 1000).toFixed(3);
      return removeTrailingZeros(formattedString, 7) + 'B';
    } else if (number >= 1000000) {
      const roundedNumber = Math.floor(number / 1000);
      formattedString = (roundedNumber / 1000).toFixed(3);
      return removeTrailingZeros(formattedString, 6) + 'M';
    } else if (number > 10000) {
      const roundedNumber = Math.floor(number);
      return roundedNumber.toLocaleString();
    } else {
      return (formattedString = number.toFixed(2));
    }
  }
  return formattedString;
}

export function number_format(number: number | string, decimals: number, dec_point: string, thousands_sep: string) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s: string | string[] = '',
    toFixedFix = function (n: number, prec: number) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

export function formatBalance(num = 0) {
  const numString = num.toString();
  if (numString.indexOf('-') !== -1) {
    const arr = numString.split('-');
    const before = arr[0].replace('e', '').split('.');
    return `0.${'0'.repeat(Number(arr[1]) - 1)}${before[0]}${before.length > 1 ? before[1] : ''}`;
  } else if (numString.indexOf('+') !== -1) {
    const arr = numString.split('+');
    const before = arr[0].replace('e', '');
    const sp = before.split('.');
    return `${Number(before) * 10 ** sp[1].length}${'0'.repeat(Number(arr[1]) - sp[1].length)}`;
  } else {
    return numString;
  }
}
