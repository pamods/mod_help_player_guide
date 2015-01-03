(function() {
  model.showPlayerGuide = ko.observable(false)
  model.togglePlayerGuide = function() {
    model.showPlayerGuide(!model.showPlayerGuide())
  }
  handlers['guide.hide'] = function() {
    model.showPlayerGuide(false)
  }
  $('body').append('<panel id="player_guide" src="coui://ui/main/game/guide/guide.html" fit="dock" style="display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 10000;" data-bind="visible: showPlayerGuide"></panel>')
  api.Panel.bindPanels()

  $('#game-bar div:first').append(
    '<br/><div class="btn_std_gray" data-bind="click: togglePlayerGuide">'+
      '<div class="btn_std_label">'+
        'Guide'+
      '</div>'+
    '</div>')
})()
