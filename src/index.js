(function(root, doc, url, libName, scriptElement, firstScript) {

  /**
   * Stub global window object until library is loaded
   * @type {Object|Function}
   */
  root[libName] = root[libName] || (root[libName] = function() {
    // non leaky args proxy
    // see: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    var args = new Array(arguments.length);

    for (var i=0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    // generate a function queue on our stub object
    (root[libName].q = root[libName].q || []).push(args);
  });

  scriptElement = doc.createElement('script');
  scriptElement.async = true;
  scriptElement.src = url;

  firstScript = doc.scripts[0];
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
})(window, document, '../src/test-lib.js', 'lib');
