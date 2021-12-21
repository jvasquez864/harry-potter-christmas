/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/**
 * window.requestIdleCallback()
 * version 0.0.0
 * Browser Compatibility:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#browser_compatibility
 */

if (!window.requestIdleCallback) {
    window.requestIdleCallback = function(callback: any, opts?: any) {
        const options = opts || {};
        const relaxation = 1;
        const timeout = options.timeout || relaxation;
        const start = performance.now();
        // Prepending setTimeout with + so that the Timeout type is interpreted as a number.
        return +setTimeout(function() {
            callback({
                get didTimeout() {
                    return options.timeout
                        ? false
                        : performance.now() - start - relaxation > timeout;
                },
                timeRemaining: function() {
                    return Math.max(0, relaxation + (performance.now() - start));
                },
            });
        }, relaxation);
    };
}

/**
 * window.cancelIdleCallback()
 * version 0.0.0
 * Browser Compatibility:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback#browser_compatibility
 */
if (!window.cancelIdleCallback) {
    window.cancelIdleCallback = function(id) {
        clearTimeout(id);
    };
}
