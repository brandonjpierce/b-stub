### Lib loader

A simple script to stub library method calls in the case that you are including a 3rd party library
asyncronously yet still want to capture method calls before the library is fully loaded into the DOM.

At this time this will only work with libraries that instantiate themselves automatically. See test-lib.js for
an example of how to run through the stub queue and call the appropriate methods.
