/* eslint-disable no-undef */
(function(isBrowserSupported) {
  if (!isBrowserSupported) return;
  window.DalineNails = window.DalineNails || {};

  window.DalineNails.injectStockistsIframe = ({ container, src, className, iframeTag }) => {
    const iframe = document.createElement(iframeTag);
    iframe.src = src;
    iframe.height = '400';
    iframe.layout = 'fill';
    iframe.sandbox = 'allow-scripts allow-same-origin allow-popups';
    iframe.frameborder = '0';
    iframe.classList.add(className);
    document.querySelector(container).appendChild(iframe);
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
