var model = {};

$(document).ready(function () {
  model.attributes = window.location.search.slice(1).split('&').map(function(attr) {
    var pair = attr.split('=')
    return {name: pair[0], value: decodeURIComponent(pair[1])}
  })
  model.attributes.forEach(function(attr) {
    model[attr.name] = attr.value
  })
  console.log(model)

  // Activates knockout.js
  ko.applyBindings(model);
});
