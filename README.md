# Stub Queue

A micro library that makes it easy for you to implement a stub queue. It will stub method calls and put them in a queue to be called later once your library is fully loaded in.

## Use cases

- Metric or tracking scripts
- Libraries that do not need any dependencies
- Libraries that are not worried about script load order
- Libraries that need to be async loaded due to size

## Implentation

Simply add in this snippet to your application:

```html
<script>window.lib=function(){window.lib.q.push([].slice.call(arguments))},window.lib.q=[];</script>
```

You will want to replace window.lib with whatever you want the stub queue to be called e.g. the global name of your library. Then in your library you need to add a means to drain the stub queue:

```javascript
if (lib.q.length) {
  lib.q.forEach(function(q) {
    var method = q.shift();
    var args = q.shift();

    if (lib[method]) {
      lib[method].apply(lib, args);
    }
  });
}
```
## Example

Here we create a simple library with the global name of YourLib.

```html
<script>window.YourLib=function(){window.YourLib.q.push([].slice.call(arguments))},YourLib.lib.q=[];</script>
<script src="yourlib.js" async defer></script>
<script>
  YourLib('foo', ['arg1', 'arg2']); // stores foo() call in queue
  YourLib('bar', ['arg1', 'arg2']); // stores bar() call in queue
</script>
```
`yourlib.js`
```javascript
function foo() {};
function bar() {};

var instance = Object.create({
  foo: foo,
  bar: bar
});

if (YourLib.q.length) {
  YourLib.q.forEach(function(q) {
    var method = q.shift();
    var args = q.shift();

    if (instance[method]) {
      instance[method].apply(instance, args);
    }
  });
}

window.YourLib = instance;
```

Check out `lib.js` in the test folder to see a full implementation.

## Does this automatically inject my library?

No. Read [Script-injected "async scripts" considered harmful](https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/) for reasonings why I chose not to go this route. You should always include your library inline with the `async` and `defer` flags.

```html
<script src="path/to/lib" async defer></script>
```
