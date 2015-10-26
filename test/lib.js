(function(root) {

  function init(foo, bar) {
    console.log('init() called');
    console.log('init() args', foo, bar);
  }

  function page() {
    console.log('page() called');
  }

  function track(foo, bar) {
    console.log('track() called');
    console.log('track() args', foo, bar);
  }

  function create() {
    var lib = {
      q: root.lib.q || [],
      methods: {
        init: init,
        page: page,
        track: track
      }
    };

    var obj = Object.create(lib.methods);

    if (lib.q.length) {
      lib.q.forEach(function(q) {
        var method = q.shift();
        var args = q.shift();

        if (obj[method]) {
          obj[method].apply(obj, args);
        }
      });
    }

    return obj;
  }

  root.lib = create();

})(window);
