(function() {
  const extractName = (anchor) => anchor.innerText.split('\n')[0];
  const extractLatLng = (anchor) => [+anchor.href.split('@')[1].split(',')[0], +anchor.href.split('@')[1].split(',')[1]];
  const extractAddress = (anchor) => anchor.innerText.split('\n').slice(1).join(', ');
  const extractAddressLink = (anchor) => anchor.href;

  // eslint-disable-next-line no-undef
  const anchors = [...document.querySelectorAll('#shopify-section-16185589067438de5f a')];
  let stockistList = [];

  for (const anchor of anchors) {
    const name = extractName(anchor);
    if (!name) continue;

    const address = extractAddress(anchor);
    if (!address) continue;

    const addressLink = extractAddressLink(anchor);
    if (!addressLink) continue;

    const latLng = extractLatLng(anchor);
    if (!latLng) continue;

    stockistList = stockistList.concat({ name, address, addressLink, latLng });
  }

  return JSON.stringify(stockistList);
}());
