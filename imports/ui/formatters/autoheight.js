export function autoheight(elem) {
  const elemCopy = elem;
  elemCopy.style.height = '1px';
  elemCopy.style.height = `${elemCopy.scrollHeight}px`;
}