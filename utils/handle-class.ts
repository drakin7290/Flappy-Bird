export function addClass(e: Element, newClass: string) {
  if (e != undefined && e != null) {
    e?.classList?.add(newClass);
  }
}
export function removeClass(e: Element, newClass: string) {
  if (e) {
    e?.classList?.remove(newClass);
  }
}
export function hasClass(e: Element, newClass: string) {
  if (e != undefined && e != null) {
    return e?.classList?.contains(newClass);
  }
}

export function toggleClass(e, newClass) {
  if (e) {
    return e?.classList.toggle(newClass);
  }
}
