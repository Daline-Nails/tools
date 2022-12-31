var registerUtils = globalThis => {
  (function(isBrowserSupported) {
    if (!isBrowserSupported()) {
      console.warn('This browser does not support Daline Nails runScript utility');
      return;
    }

    globalThis.DalineNails = globalThis.DalineNails || {};

    globalThis.DalineNails.runScript = ({ fn, everyMilliseconds, exitCondition = result => result.returnValue === undefined }) => {
      let runCount = 0;

      return new Promise(resolve => {
        const intervalId = setInterval(() => {
          runCount += 1;

          const result = { returnValue: fn(), runCount: runCount };

          if (exitCondition(result)) {
            clearInterval(intervalId);
            resolve(result);
          }
        }, everyMilliseconds);
      });
    };

    globalThis.DalineNails.FeraLogger = ({ debug }) => {
      return {
        log: (...args) => {
          if (debug === true) {
            console.log.apply(null, args);
          }
        }
      }
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

    return (
      !!supportsArrow() &&
      !!supportsAsync() &&
      !!supportsTemplateLiterals()
    );
  }));
};

module.exports = global => ({
  utils: registerUtils(global)
});
