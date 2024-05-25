// delete an element
export function deleteEl(e: Element) {
  e.parentNode.removeChild(e);
}

// check child is in parent
export function checkParent(parent: Element, child: Element) {
  if (parent.contains(child)) return true;
  return false;
}

// can use DOM now (client)
export function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

// get a bound
export function getBound(ref: any) {
  if (!ref?.current) return;
  return ref?.current?.getBoundingClientRect();
}
