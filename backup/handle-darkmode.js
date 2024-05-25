import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IS_DARK_MODE_KEY } from '~/context/defaultConst';

export default function setDarkmode() {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();

  setCookie(IS_DARK_MODE_KEY, !getCookie(IS_DARK_MODE_KEY));
  document.cookie = IS_DARK_MODE_KEY + '=' + getCookie(IS_DARK_MODE_KEY) + ';' + expires;
}
export function statusDarkmode() {
  return !!getCookie(IS_DARK_MODE_KEY);
}
