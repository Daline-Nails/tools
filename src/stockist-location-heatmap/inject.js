/* eslint-disable no-undef */
(function(isBrowserSupported) {
  if (!isBrowserSupported) {
    // eslint-disable-next-line no-console
    console.error('This browser is not supported');
    return;
  }
  window.DalineNails = window.DalineNails || {};

  window.DalineNails.injectStockistsIframe = ({ container, src, classNames }) => {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.height = '400';
    iframe.layout = 'fill';
    iframe.sandbox = 'allow-modals allow-scripts allow-same-origin allow-popups allow-top-navigation';
    iframe.allow = 'geolocation *';
    iframe.frameborder = '0';
    for (const className of classNames.split(' ')) {
      iframe.classList.add(className);
    }
    [...document.querySelectorAll(container)].forEach(containerElement => {
      containerElement.innerHTML = '';
      containerElement.appendChild(iframe);
    });
  };
}(function() {
  function supportsArrow() {
    try {
      eval('()=>{}');
    } catch (e) {
      return false;
    }
    return true;
  }
  function supportsAsync() {
    try {
      eval('async () => {}');
      return true;
    } catch (e) { return false }
  }
  function supportsTemplateLiterals() {
    try { return eval("''===``") }
    catch(e) { return false; }
  }
  function supportsClassList() {
    return !!document.documentElement.classList;
  }

  return (
    !!supportsArrow() &&
    !!supportsAsync() &&
    !!supportsTemplateLiterals() &&
    !!supportsClassList()
  );
}));
