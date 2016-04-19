//异步中作用域是如何导致bug出现的
function asyncFunction(callback) {
  setTimeout(function() {
    callback()
  }, 200);
}

var color = 'blue';

asyncFunction(function() {
  console.log('The color is ' + color);
});

color = 'green';