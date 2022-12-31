/**
 * Copy/Paste utils code into here until I develop a proper build process
 */

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

registerUtils(window);

const logger = window.DalineNails.FeraLogger({
  debug: false
});

// eslint-disable-next-line no-unused-vars
var FeraWidget = function(widget) {

  /**
   * This function will be triggered when the widget is ready to run.
   */
  this.run = function () {
    return (function(isBrowserSuported) {
      if (!isBrowserSuported) {
        console.warn('This browser does not support Daline Nails custom script');
        return;
      }

      var reviews = window.reviews = new Fera_AllReviews(widget);
      var showResult = reviews.show();

      const findReviews = () => {
        logger.log('-------- Running Custom Code v10 --------');
        logger.log('Finding $el', reviews.reviewBlock.$el);

        const blockOfReviews = reviews.reviewBlock.$el;
        let reviewElements = [];

        // reviews.reviewBlock.$el is an array, so looping to account for potential multiple review blocks in the same page
        blockOfReviews.forEach(block => {
          logger.log('Found element block', block);
          reviewElements = reviewElements.concat(
            [...block.getElementsByClassName('fera-allReviews-review-date')]
          );
          logger.log('Looping "fera-allReviews-review-date" (' + reviewElements.length + ')', reviewElements);
        });

        return reviewElements;
      };

      const hideDates = result => {
        const reviewElements = result.returnValue;
        if (reviewElements.length > 0) {
          reviewElements.forEach(element => {
              logger.log('Hiding ->', element);
              return element.style.display = 'none';
          });
          return true;
        }
      };

      window.DalineNails.runScript({
        fn: findReviews,
        exitCondition: hideDates,
        everyMilliseconds: 100
      });

      return showResult;

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
};