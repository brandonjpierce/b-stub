(function(root) {

  function init(foo, bar) {
    console.log('init() called');
    console.log('init() args', foo, bar);
  }

  function track(foo, bar) {
    console.log('track() called');
    console.log('track() args', foo, bar);
  }

  function create() {
    var lib = {
      q: root.lib.q || [],
      state: {},
      methods: {
        init: init,
        track: track
      }
    };

    var obj = Object.create(lib.methods);

    for (var key in lib.state) {
      obj[key] = lib.state[key];
    }

    if (lib.q.length) {
      for (var i in lib.q) {
        var method = lib.q[i].shift();
        var args = lib.q[i].shift();

        if (obj[method]) {
          obj[method].apply(obj, args);
        }
      }
    }

    return obj;
  }

  root.lib = create();

})(window);
