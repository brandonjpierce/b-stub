(function(root) {

  function Lib() {}

  Lib.prototype.init = function(alpha, numeric) {
    // mimic's a functions constructor
    this.alpha = alpha;
    this.numeric = numeric;

    console.log('Calling init()');
    console.log('init() args:', alpha, numeric);
  }

  Lib.prototype.your = function(foo, bar) {
    console.log('Calling your()');
    console.log('your() args:', foo, bar);
  };

  Lib.prototype.public = function() {
    console.log('Calling public()');
  }

  Lib.prototype.methods = function(data) {
    console.log('Calling methods()');
    console.log('methods() args:', data);
  }

  Lib.prototype.here = function() {
    console.log('Calling here()');
  }

  // Auto instantiate our class
  var instance = new Lib();

  // Check to see if we have a stub queue
  if (root.lib) {
    while (root.lib.length) {
      var data = root.lib.shift();
      var method = data.shift();

      if (instance[method]) {
        instance[method].apply(instance, data);
      }
    }
  }

  // override stub queue with actual library
  root.lib = Lib;

})(window);
