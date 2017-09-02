export function resizeHeight(elem) {
  if (!elem) {
    return;
  }
  const elemCopy = elem;
  elemCopy.style.height = '1px';
  elemCopy.style.height = `${elemCopy.scrollHeight}px`;
}
