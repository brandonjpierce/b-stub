(function(root) {

  /**
   * Stub global window object until library is loaded
   * @type {Object|Array}
   */
  var lib = root.lib = root.lib || [];

  /**
   * Smart method stub that captures method calls and arguments for playback
   * @method stub
   * @param  {String} method The method name we want to stub
   * @return {Object|Array} Our global lib object
   */
  function stub(method) {
    return function() {
      // non leaky args proxy
      // see: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
      var args = new Array(arguments.length);

      for (var i=0; i < args.length; ++i) {
        args[i] = arguments[i];
      }

      args.unshift(method);
      lib.push(args);
    }
  }

  /**
   * Define public functions you want to stub on your library here
   */
  [
    'init',
    'your',
    'public',
    'methods',
    'here'
  ].forEach(function(method) {
    lib[method] = stub(method);
  });

})(window);
